import { atom } from 'jotai';

export const menuIdAtom = atom('');

export const resetMenuIdState = atom(
  (get) => get(menuIdAtom),
  (_, set) => {
    set(menuIdAtom, '');
  }
);

export const selectMenuIdState = atom(
  (get) => get(menuIdAtom),
  (_, set, id: string) => {
    set(menuIdAtom, id);
  }
);
