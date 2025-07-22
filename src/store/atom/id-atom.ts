import { atom } from 'jotai';

export const idAtom = atom('');

export const resetIdState = atom(null, (_, set) => {
  set(idAtom, '');
});

export const selectIdState = atom(null, (_, set, id: string) => {
  set(idAtom, id);
});
