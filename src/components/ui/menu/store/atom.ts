import { atom } from 'jotai';

import { Menu } from '@/lib/supabase/tables/menu';
import { ZodIssue } from 'zod';
import { clearZodErrorForField, mapZodFieldErrors } from '@/util/function/input-error';

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
});
export const clearSelectedMenuAtom = atom(null, (_, set) => {
  set(menuAtom, initMenu);
  set(draftMenuAtom, initMenu);
});

export type MenuFormInputs = {
  img_url: string; // 사진 주소
  name: string; // 음식명
  title: string; // 분류
  price: string; // 가격
  tag: string; // 판매 상태
};
type MenuErrorFormKeys = Map<keyof MenuFormInputs, string>;

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

/* 메뉴 이미지 상태 관리 */
export const menuImageFileAtom = atom<File>();
export const setMenuImageFileAtom = atom(null, (_, set, file: File) => {
  set(menuImageFileAtom, file);
});
export const resetMenuImageFileAtom = atom(null, (_, set) => {
  set(menuImageFileAtom, undefined);
});
