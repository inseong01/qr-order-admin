import supabase from '..';
import { Tables, TablesInsert, TablesUpdate } from '../database.types';

// menu_category table type
export type MenuCategory = Tables<'menu_category'>;
export type NewMenuCategory = TablesInsert<'menu_category'>;
export type UpdateMenuCategory = TablesUpdate<'menu_category'>;

/**
 * 메뉴 카테고리를 가져오는 함수
 * @returns 메뉴 카테고리 목록
 */
export async function getMenuCategory(): Promise<MenuCategory[]> {
  const { data, error } = await supabase.from('menu_category').select('*').order('id', { ascending: true });

  if (error) {
    error.message && console.error(error.message);
    throw error;
  }

  return data;
}

/**
 * 메뉴 카테고리를 추가하는 함수
 * @param newMenuCategory - 추가할 메뉴 카테고리 정보
 * @returns
 */
export const addMenuCategory = async (newMenuCategory: NewMenuCategory) => {
  const { error } = await supabase.from('menu_category').insert(newMenuCategory);

  if (error) {
    throw error;
  }

  return;
};

/**
 * 메뉴 카테고리 정보를 수정하는 함수
 * @param updatedMenuCategories - 수정할 메뉴 카테고리 정보 배열
 * @returns
 */
export const updateMenuCategory = async (updatedMenuCategories: UpdateMenuCategory[]) => {
  const { error } = await supabase.from('menu_category').upsert(updatedMenuCategories);

  if (error) {
    throw error;
  }

  return;
};

/**
 * 메뉴 카테고리를 삭제하는 함수
 * @param id - 삭제할 메뉴 카테고리 id 배열
 * @returns
 */
export const deleteMenuCategory = async (id: string[]) => {
  const { error, data } = await supabase.from('menu_category').delete().in('id', id).select();

  if (error) {
    throw error;
  }

  // 조건에 맞는 행이 없거나 RLS 정책에 의해 접근이 거부된 경우
  if (!data.length) {
    console.error('Delete failed: No rows matched the condition.');
    throw new Error('Unable to delete the menu category.');
  }

  return;
};
