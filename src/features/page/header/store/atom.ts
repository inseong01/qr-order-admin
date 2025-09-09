import { atom } from 'jotai';

export const headerTabAtom = atom(0);

export const setHeaderTabAtom = atom(null, (_, set, idx: number) => {
  set(headerTabAtom, idx);
});
