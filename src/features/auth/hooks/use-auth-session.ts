import { useAtomValue, useSetAtom } from 'jotai';
import { Session } from '@supabase/supabase-js';
import { useCallback, useEffect } from 'react';

import supabase from '@/lib/supabase';
import { verifyJWT } from '@/utils/function/verify-jwt';
import { clearStorageKeys } from '@/utils/function/clear-storage-key';
import { loginStateAtom, setLoginAtom, setLogoutAtom, setUserSessionAtom } from '@/features/auth/store/user-atom';
import { loadingStateAtom, setLoadingStateAtom, setSuccessStateAtom } from '../store/form-atom';

export default function useAuthSession() {
  /** 로딩 상태 관리 */
  const isLoading = useAtomValue(loadingStateAtom);
  const setLoadingState = useSetAtom(setLoadingStateAtom);

  /** 로그인 상태 관리 */
  const isLogin = useAtomValue(loginStateAtom);
  const logout = useSetAtom(setLogoutAtom);
  const login = useSetAtom(setLoginAtom);

  /** 사용자 세션 관리 */
  const setSession = useSetAtom(setUserSessionAtom);

  /** 로그인 접속 성공 관리 */
  const setSuccessState = useSetAtom(setSuccessStateAtom);

  /** 세션 유효성 검사 + 상태 반영 */
  const processSession = useCallback(
    async (session: Session | null) => {
      if (!session) {
        logoutAndClear();
        setLoadingState(false);
        return;
      }

      try {
        setLoadingState(true);
        const validSession = await verifyJWT();
        if (validSession) {
          login();
          setSession(session);
          setSuccessState(true);
        } else {
          logoutAndClear();
        }
      } catch (err) {
        console.error(err);
        logoutAndClear();
      } finally {
        setLoadingState(false);
      }
    },
    [login, logout, setSession, setSuccessState, setLoadingState]
  );

  /** 로그아웃 및 초기화 */
  const logoutAndClear = useCallback(() => {
    logout();
    setSession(null);
    clearStorageKeys();
    setSuccessState(false);
  }, [logout, setSession, setSuccessState]);

  /** 초기 마운트 시 세션 검증 */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      processSession(data.session);
    });
  }, [processSession]);

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

  return { isLogin, isLoading };
}
