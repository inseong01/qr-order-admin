import supabase from '..';
import { Tables } from '../database.types';

// menu table type
type MenuList = Tables<'menu'>;

/**
 * 메뉴 목록을 가져오는 함수
 * @returns 메뉴 목록
 */
export async function getMenuList(): Promise<MenuList[]> {
  const { data, error } = await supabase.from('menu').select('*').order('price', { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
