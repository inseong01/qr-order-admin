import supabase from '..';
import { Tables, TablesInsert, TablesUpdate } from '../database.types';

// menu_category table type
type MenuCategory = Tables<'menu_category'>;
type NewMenuCategory = TablesInsert<'menu_category'>;
type UpdateMenuCategory = TablesUpdate<'menu_category'>;

/**
 * 메뉴 카테고리를 가져오는 함수
 * @returns 메뉴 카테고리 목록
 */
export async function getMenuCategory(): Promise<MenuCategory[]> {
  const { data, error } = await supabase.from('menu_category').select('*').order('id', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
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
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 메뉴 카테고리 정보를 수정하는 함수
 * @param id - 수정할 메뉴 카테고리 id
 * @param updatedMenuCategory - 수정할 메뉴 카테고리 정보
 * @returns
 */
export const updateMenuCategory = async (id: string, updatedMenuCategory: UpdateMenuCategory) => {
  const { error } = await supabase.from('menu_category').update(updatedMenuCategory).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 메뉴 카테고리를 삭제하는 함수
 * @param id - 삭제할 메뉴 카테고리 id
 * @returns
 */
export const deleteMenuCategory = async (id: string) => {
  const { error } = await supabase.from('menu_category').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};
