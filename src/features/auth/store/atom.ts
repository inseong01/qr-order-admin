import { atom } from 'jotai';
import { boolean, ZodIssue } from 'zod';

/* 로그인 */
export type LoginForm = {
  id: string;
  password: string;
};
const initLoginForm: LoginForm = {
  id: '',
  password: '',
};
export const loginFormAtom = atom(initLoginForm);

/* 회원가입 */
export type SignupForm = {
  id: string;
  password: string;
  confirmPassword: string;
};
const initSignupForm: SignupForm = {
  id: '',
  password: '',
  confirmPassword: '',
};
export const signupFormAtom = atom(initSignupForm);

/* 비밀번호 찾기 */
export type FindPwdForm = {
  id: string;
};
const initFindPwdForm: FindPwdForm = {
  id: '',
};
export const findPwdFormAtom = atom(initFindPwdForm);

/* 입력 에러 */
export type ErrorFormKeys = Map<keyof SignupForm, any>;
export const errorFormAtom = atom<ErrorFormKeys>(new Map());
export const setErrorFormAtom = atom(null, (_, set, issues: ZodIssue[]) => {
  const issueObj = new Map();

  issues.forEach((i) => {
    const field = i.path[0].toString();
    const message = i.message.toString();
    issueObj.set(field, message);
  });

  set(errorFormAtom, issueObj);
});
export const clearErrorFormAtom = atom(null, (get, set, field: keyof SignupForm) => {
  const prevMap = new Map(get(errorFormAtom));
  prevMap.delete(field);
  set(errorFormAtom, prevMap);
});

/* 폼 초기화 */
export const resetFormAtom = atom(null, (_, set) => {
  set(loginFormAtom, initLoginForm);
  set(signupFormAtom, initSignupForm);
  set(findPwdFormAtom, initFindPwdForm);
  set(errorFormAtom, new Map());
});

/* 로딩 */
export const loadingStateAtom = atom(false);
export const setLoadingStateAtom = atom(null, (_, set, state: boolean) => {
  set(loadingStateAtom, state);
});
