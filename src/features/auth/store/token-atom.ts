import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { CAPTCHA_TOKEN } from '../const';

const storage = createJSONStorage<string>(() => sessionStorage);
const initToken = sessionStorage.getItem(CAPTCHA_TOKEN) ?? '';

/** 캡챠 토큰 */
export const captchaTokenAtom = atomWithStorage(CAPTCHA_TOKEN, initToken, storage);
export const setCaptchaTokenAtom = atom(null, (_, set, token: string) => {
  set(captchaTokenAtom, token);
});

/** 캡챠 스크립트 첫 실행 여부 */
export const firstLoadStateAtom = atom(true);

/* 캡챠 토큰 재발급 */
export const captchaRefreshAtom = atom(null, (_, set) => {
  set(firstLoadStateAtom, true);
  set(captchaTokenAtom, '');
});
