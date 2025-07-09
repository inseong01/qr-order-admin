import { atom } from 'jotai';

export const idAtom = atom('');

export const resetIdState = atom(
  (get) => get(idAtom),
  (_, set) => {
    set(idAtom, '');
  }
);

export const selectIdState = atom(
  (get) => get(idAtom),
  (_, set, id: string) => {
    set(idAtom, id);
  }
);
