import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import supabase from '@/lib/supabase';
import { clearStorageKeys } from '@/utils/function/clear-storage-key';
import { loginStateAtom, setLoginAtom, setLogoutAtom, userSessionAtom } from '@/features/auth/store/user-atom';
import { loadingStateAtom, setLoadingStateAtom } from '../store/form-atom';

export default function useAuthSession() {
  /** 로딩 상태 관리 */
  const isLoading = useAtomValue(loadingStateAtom);
  const setLoadingState = useSetAtom(setLoadingStateAtom);

  /** 로그인 상태 관리 */
  const isLogin = useAtomValue(loginStateAtom);
  const logout = useSetAtom(setLogoutAtom);
  const login = useSetAtom(setLoginAtom);

  /** 사용자 세션 관리 */
  const [_, setSession] = useAtom(userSessionAtom);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setLoadingState(true);

      switch (event) {
        case 'INITIAL_SESSION': {
          if (!session) {
            logout();
            clearStorageKeys();
            setSession(null);
          } else {
            login();
            setSession(session);
          }
          break;
        }
        case 'SIGNED_IN': {
          login();
          setSession(session);
          break;
        }
        case 'SIGNED_OUT': {
          logout();
          setSession(null);
          clearStorageKeys();
          break;
        }
        case 'PASSWORD_RECOVERY': {
          setSession(session);
          break;
        }
        case 'TOKEN_REFRESHED': {
          setSession(session);
          break;
        }
      }

      setLoadingState(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isLogin, isLoading };
}
