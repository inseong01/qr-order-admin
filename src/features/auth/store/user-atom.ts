import { atom } from 'jotai';
import { Session } from '@supabase/supabase-js';

/* 로그인 상태 */
export const loginStateAtom = atom(false);
export const setLoginAtom = atom(null, (_, set) => {
  set(loginStateAtom, true);
});
export const setLogoutAtom = atom(null, (_, set) => {
  set(loginStateAtom, false);
});

/* 사용자 로그인 정보 */
export const userSessionAtom = atom<Session | null>(null);
