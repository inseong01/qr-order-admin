import supabase from '..';
import { Tables } from '../database.types';

// menu_category table type
type MenuCategory = Tables<'menu_category'>;
// request_categories table type
type RequestCategory = Tables<'request_categories'>;

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
 * 요청 카테고리를 가져오는 함수
 * @returns 요청 카테고리 목록
 */
export async function getRequestCategory(): Promise<RequestCategory[]> {
  const { data, error } = await supabase.from('request_categories').select('*').order('id', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
