import { atom } from 'jotai';

export type ImageLoadedStateType = 'pending' | 'success' | 'rejected';
export const imageLoadedStateAtom = atom<ImageLoadedStateType>('pending');
export const setImageLoadedAtom = atom(null, (_, set, state: ImageLoadedStateType) => {
  set(imageLoadedStateAtom, state);
});

/* 메뉴 이미지 상태 관리 */
export const imageFileAtom = atom<File>();
export const setMenuImageFileAtom = atom(null, (_, set, file: File | undefined) => {
  set(imageFileAtom, file);
});
export const resetMenuImageFileAtom = atom(null, (_, set) => {
  set(imageFileAtom, undefined);
});

/* 메뉴 이미지 오류 상태 관리 */
export const imageFileErrorAtom = atom('');
export const setImageFileErrorAtom = atom(null, (_, set, message: string) => {
  set(imageFileErrorAtom, message);
});
export const resetImageFileErrorAtom = atom(null, (_, set) => {
  set(imageFileErrorAtom, '');
});
