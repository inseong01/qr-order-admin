import { useCallback, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { useAtomValue, useSetAtom } from 'jotai';

import supabase from '@/lib/supabase';
import { verifyAuthJWT } from '../util/verify-auth-jwt';
import { getAuthSession } from '../util/auth-supabase-api';
import { clearStorageKeys } from '../util/clear-storage-key';
import { authStatusAtom, captchaRefreshAtom, isLoggedInAtom, setUserSessionAtom } from '../store/auth-atom';

export default function useAuthSession() {
  const isLogin = useAtomValue(isLoggedInAtom);
  const authStatus = useAtomValue(authStatusAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const setSession = useSetAtom(setUserSessionAtom);
  const captchaRefresh = useSetAtom(captchaRefreshAtom);

  /** 로그아웃 및 상태 초기화 */
  const logoutAndClear = useCallback(() => {
    setSession(null);
    clearStorageKeys();
    setAuthStatus('idle');
  }, [setSession, setAuthStatus]);

  /**
   * 세션 유효성 검사 + 상태 반영
   *
   * authStatus 의존성 추가 시 무한루프 적용됨
   */
  const processSession = useCallback(
    async (session: Session | null) => {
      if (authStatus === 'success') return;

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
          setAuthStatus('success');
        }
      } catch (err) {
        console.error(err);
        logoutAndClear();
      }
    },
    [logoutAndClear, setAuthStatus, setSession]
  );

  /** 초기 마운트 시 세션 검증 */
  useEffect(() => {
    getAuthSession()
      .then((res) => {
        processSession(res.data.session);
      })
      .catch(() => {
        setAuthStatus('error');
      });
  }, [processSession]);

  /** 인증 상태 변경 감지 */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        logoutAndClear();
        captchaRefresh();
      } else {
        processSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [processSession, logoutAndClear, captchaRefresh]);

  return { isLogin };
}
