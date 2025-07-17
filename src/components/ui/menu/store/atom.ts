import { atom } from 'jotai';

import { Menu } from '@/lib/supabase/function/menu';

export const menuAtom = atom<Menu | null>(null);

export const selectMenuAtom = atom(null, (_, set, menu: Menu) => {
  set(menuAtom, menu);
});

export const clearSelectedMenuAtom = atom(null, (_, set) => {
  set(menuAtom, null);
});
