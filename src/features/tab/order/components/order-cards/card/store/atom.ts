import { atom } from 'jotai';

export const clickStateAtom = atom(false);
export const setClickStateAtom = atom(null, (_, set) => {
  set(clickStateAtom, (prev) => !prev);
});
