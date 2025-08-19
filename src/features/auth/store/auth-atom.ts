import { atom } from 'jotai';
import { ZodIssue } from 'zod';
import { Session } from '@supabase/supabase-js';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { CAPTCHA_TOKEN } from '../const';

/* 사용자 로그인 정보 */
export const userSessionAtom = atom<Session | null>(null);
export const setUserSessionAtom = atom(null, (_, set, session: Session | null) => {
  set(userSessionAtom, session);
});

/* 폼 */
export type FormInputs = {
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
export const signupFormAtom = atom<FormInputs>({ id: '', password: '', confirmPassword: '' });

// 비밀번호 찾기
export const findPwdFormAtom = atom({ id: '' });

// 비밀번호 수정
export const resetPwdFormAtom = atom({ password: '', confirmPassword: '' });

/* 입력 에러 */
type ErrorFormKeys = Map<keyof FormInputs, string>;
export const errorFormAtom = atom<ErrorFormKeys>(new Map());
export const setErrorFormAtom = atom(null, (_, set, issues: ZodIssue[]) => {
  const issueObj = new Map<keyof FormInputs, string>();

  issues.forEach((i) => {
    const field = i.path[0].toString() as keyof FormInputs;
    const message = i.message.toString();
    issueObj.set(field, message);
  });

  set(errorFormAtom, issueObj);
});
export const clearErrorFormAtom = atom(null, (get, set, field: keyof FormInputs) => {
  const prevMap = new Map(get(errorFormAtom));
  prevMap.delete(field);
  set(errorFormAtom, prevMap);
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
const storage = createJSONStorage<string>(() => sessionStorage);
const initToken = sessionStorage.getItem(CAPTCHA_TOKEN) ?? '';

// 토큰
export const captchaTokenAtom = atomWithStorage(CAPTCHA_TOKEN, initToken, storage);
export const setCaptchaTokenAtom = atom(null, (_, set, token: string) => {
  set(captchaTokenAtom, token);
});

// 토큰 재발급
export const captchaRefreshAtom = atom(null, (_, set) => {
  set(captchaTokenAtom, '');
  set(authStatusAtom, 'idle');
});
