import { atom } from 'jotai';

import { Menu } from '@/lib/supabase/tables/menu';

export const initMenu = {
  menu_category: {
    title: '',
  },
  id: '',
  img_url: '',
  name: '',
  price: 0,
  tag: '기본',
};

export const menuAtom = atom<Menu>(initMenu);

export const selectMenuAtom = atom(null, (_, set, menu: Menu) => {
  set(menuAtom, menu);
});

export const clearSelectedMenuAtom = atom(null, (_, set) => {
  set(menuAtom, initMenu);
});
