import { atom } from 'jotai';
import { ZodIssue } from 'zod';
import { Session } from '@supabase/supabase-js';

import { clearZodErrorForField, mapZodFieldErrors } from '@/util/function/input-error';

/* 사용자 로그인 정보 */
export const userSessionAtom = atom<Session | null>(null);
export const setUserSessionAtom = atom(null, (_, set, session: Session | null) => {
  set(userSessionAtom, session);
});

/* 폼 */
export type AuthFormInputs = {
  id: string;
  password: string;
  confirmPassword: string;
};

// 로그인 상태
export const isLoggedInAtom = atom((get) => !!get(userSessionAtom));

/**
 * 인증 절차 상태
 *
 * `loading` : 비동기 작업이 진행 중인 상태
 * `idle`    : 비동기 작업이 없고, 사용자의 입력을 기다리는 유휴 상태
 * `success` : 인증 작업이 성공적으로 완료된 상태
 * `error`   : 인증 과정에서 오류가 발생한 상태
 */
type AuthStatusAtom = 'idle' | 'loading' | 'success' | 'error';
export const authStatusAtom = atom<AuthStatusAtom>('loading');

// 로그인
export const loginFormAtom = atom({ id: '', password: '' });

// 회원가입
export const signupFormAtom = atom<AuthFormInputs>({ id: '', password: '', confirmPassword: '' });

// 비밀번호 찾기
export const findPwdFormAtom = atom({ id: '' });

// 비밀번호 수정
export const resetPwdFormAtom = atom({ password: '', confirmPassword: '' });

/* 입력 에러 */
type AuthErrorFormKeys = Map<keyof AuthFormInputs, string>;
export const errorFormAtom = atom<AuthErrorFormKeys>(new Map());
export const setErrorFormAtom = atom(null, (_, set, issues: ZodIssue[]) => {
  const errorForm = mapZodFieldErrors<AuthFormInputs>(issues);
  set(errorFormAtom, errorForm);
});
export const clearAuthErrorFormAtom = atom(null, (get, set, field: keyof AuthFormInputs) => {
  const updatedErrorForm = clearZodErrorForField(get(errorFormAtom), field);
  set(errorFormAtom, updatedErrorForm);
});

/* 폼 초기화 */
export const resetAllFormsAtom = atom(null, (_, set) => {
  set(loginFormAtom, { id: '', password: '' });
  set(signupFormAtom, { id: '', password: '', confirmPassword: '' });
  set(findPwdFormAtom, { id: '' });
  set(resetPwdFormAtom, { password: '', confirmPassword: '' });
  set(errorFormAtom, new Map());
  set(authStatusAtom, 'idle');
});

/* 캡챠 토큰 */
export const captchaTokenAtom = atom('');
export const setCaptchaTokenAtom = atom(null, (_, set, token: string) => {
  set(captchaTokenAtom, token);
});

// 토큰 재발급
export const captchaRefreshAtom = atom(null, (_, set) => {
  set(captchaTokenAtom, '');
});
