import { atom } from 'jotai';

export type ImageLoadedStateType = 'pending' | 'success' | 'rejected';
export const imageLoadedStateAtom = atom<ImageLoadedStateType>('pending');
export const setImageLoadedAtom = atom(null, (_, set, state: ImageLoadedStateType) => {
  set(imageLoadedStateAtom, state);
});
