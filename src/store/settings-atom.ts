import { atom } from 'jotai';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = prefersDark ? 'dark' : 'light';

/**
 * @description 사용자 테마 설정 atom
 * - 기본값은 사용자 정의 테마입니다.
 */
export const themeAtom = atom<typeof theme>(theme);

/**
 * @description 사용자 언어 설정 atom (예: 'ko', 'en')
 * - 기본값은 사용자 정의 언어입니다.
 */
export const languageAtom = atom(navigator.language);
