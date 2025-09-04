import { useLocation } from 'react-router';
import { useCallback, useEffect, useRef } from 'react';
import { Session } from '@supabase/supabase-js';
import { useAtomValue, useSetAtom, useStore } from 'jotai';

import supabase from '@/lib/supabase';
import { PATHS } from '@/constants/paths';
import { verifyAuthJWT } from '../util/verify-auth-jwt';
import { clearStorageKeys } from '../util/clear-storage-key';
import { authStatusAtom, isLoggedInAtom, setUserSessionAtom } from '../store/auth-atom';

export default function useAuthSession() {
  const isLogin = useAtomValue(isLoggedInAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const setSession = useSetAtom(setUserSessionAtom);

  const store = useStore();
  const { pathname } = useLocation();

  /** 로그아웃 및 스토리지 초기화 */
  const logoutAndClear = useCallback(() => {
    setSession(null);
    clearStorageKeys();
  }, [setSession]);

  /**
   * 인증 필요한 라우터에서만 success 할당
   * 이외 라우터에서 success 할당하는 경우 접속 즉시 리다이렉트 발생
   * 예: update/password -> auth/login
   */
  const isAuthPage = pathname.includes(PATHS.AUTH.MAIN);
  const processAuthStatus = isAuthPage ? 'success' : 'idle';

  /**
   * 첫 마운트 때 processSession 중복 실행 방지 역할
   *
   * useEffect: verifyAuthJWT, onAuthStateChange
   */
  const isFirstMounted = useRef(true);

  /**
   * 세션 유효성 검사 + 상태 반영
   * 주의: authStatus 의존성 추가 시 무한루프 적용됨
   */
  const processSession = useCallback(
    async (session: Session | null) => {
      if (isFirstMounted.current) return;

      const currentAuthStatus = store.get(authStatusAtom);

      if (currentAuthStatus === 'success' || currentAuthStatus === 'error') return;

      if (!session) {
        return logoutAndClear();
      }
      setAuthStatus('loading');

      try {
        const validSession = await verifyAuthJWT();
        if (!validSession) {
          logoutAndClear();
        } else {
          setSession(session);

          setAuthStatus(processAuthStatus);
        }
      } catch (err) {
        console.error(err);
        logoutAndClear();
      }
    },
    [store, logoutAndClear, setAuthStatus, setSession]
  );

  /** 초기 마운트 시 세션 검증 */
  useEffect(() => {
    verifyAuthJWT()
      .then((res) => {
        const currentAuthStatus = store.get(authStatusAtom);
        if (currentAuthStatus === 'success' || currentAuthStatus === 'error') return;

        setAuthStatus('loading');

        if (!res.session) {
          logoutAndClear();
          setAuthStatus('idle');
          return;
        }

        setSession(res.session);

        setAuthStatus(processAuthStatus);

        isFirstMounted.current = false;
      })
      .catch(() => {
        setAuthStatus('error');
      });
  }, [store, logoutAndClear, setAuthStatus, setSession]);

  /** 인증 상태 변경 감지 */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        logoutAndClear();
      } else {
        processSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [processSession, logoutAndClear]);

  return { isLogin };
}
