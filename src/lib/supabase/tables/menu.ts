import supabase from '..';
import { TablesInsert, TablesUpdate } from '../database.types';

// menu table type
export type Menu = {
  menu_category: { title: string };
  id: string;
  img_url: string;
  name: string;
  price: number;
  tag: string;
};
export type NewMenu = TablesInsert<'menu'>;
export type UpdateMenu = TablesUpdate<'menu'>;

/**
 * 메뉴 목록을 가져오는 함수
 * @returns 메뉴 목록
 */
export async function getMenuList() {
  const { data, error } = await supabase.from('menu').select(`id, img_url, name, price, tag, menu_category (id,title)`);

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * 메뉴를 추가하는 함수
 * @param newMenu - 추가할 메뉴 정보
 * @returns
 */
export const addMenu = async (newMenu: NewMenu) => {
  const { data, error } = await supabase
    .from('menu')
    .insert(newMenu)
    .select(`id, img_url, name, price, tag, menu_category (id,title)`);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * 메뉴를 수정하는 함수
 * @param id - 수정할 메뉴 id
 * @param updatedMenu - 수정할 메뉴 정보
 * @returns
 */
export const updateMenu = async (id: string, updatedMenu: UpdateMenu) => {
  const { data, error } = await supabase
    .from('menu')
    .update(updatedMenu)
    .eq('id', id)
    .select(`id, img_url, name, price, tag, menu_category (id,title)`);

  if (error) {
    throw new Error(error.message);
  }

  // 조건에 맞는 행이 없거나 RLS 정책에 의해 접근이 거부된 경우
  if (!data.length) {
    console.error('Update failed: No rows matched the condition.');
    throw new Error('Unable to update the menu.');
  }

  return data;
};

/**
 * 메뉴를 삭제하는 함수
 * @param id - 삭제할 메뉴 id
 * @returns
 */
export const deleteMenu = async (id: string) => {
  const { error, data } = await supabase.from('menu').delete().eq('id', id).select();

  if (error) {
    throw new Error(error.message);
  }

  // 조건에 맞는 행이 없거나 RLS 정책에 의해 접근이 거부된 경우
  if (!data.length) {
    console.error('Delete failed: No rows matched the condition.');
    throw new Error('Unable to delete the menu.');
  }

  return data;
};
