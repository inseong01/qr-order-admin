import { atom } from 'jotai';
import { ZodIssue } from 'zod';

import { Menu } from '@/lib/supabase/tables/menu';
import { clearZodErrorForField, mapZodFieldErrors } from '@/util/function/input-error';

import { setImageLoadedAtom } from '@/features/modal/tab/menu/store/atom';

import { initMenu } from '../const';
import { MenuErrorFormKeys, MenuFormInputs } from '../types';

/* 메뉴 상태 관리 */
export const menuAtom = atom<Menu>(initMenu);
export const draftMenuAtom = atom<Menu>(initMenu);
export const selectMenuAtom = atom(null, (get, set, menu: Menu) => {
  const prevMenu = get(menuAtom);

  const isSameId = prevMenu.id === menu.id;
  const isSameCategory = prevMenu.menu_category.title === menu.menu_category.title;
  if (isSameId && isSameCategory) return;

  set(menuAtom, menu);
  set(draftMenuAtom, menu);
  set(setImageLoadedAtom, 'pending');
});
export const clearSelectedMenuAtom = atom(null, (_, set) => {
  set(menuAtom, initMenu);
  set(draftMenuAtom, initMenu);
});

/* 메뉴 입력 오류 상태 관리 */
export const menuErrorFormAtom = atom<MenuErrorFormKeys>(new Map());
export const setMenuErrorAtom = atom(null, (_, set, issues: ZodIssue[]) => {
  const errorForm = mapZodFieldErrors<MenuFormInputs>(issues);
  set(menuErrorFormAtom, errorForm);
});
export const clearMenuErrorFormAtom = atom(null, (get, set, field: keyof MenuFormInputs) => {
  const updatedErrorForm = clearZodErrorForField(get(menuErrorFormAtom), field);
  set(menuErrorFormAtom, updatedErrorForm);
});
export const resetMenuErrorAtom = atom(null, (_, set) => {
  set(menuErrorFormAtom, new Map());
});
