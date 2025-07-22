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
export async function getMenuList(): Promise<Menu[]> {
  const { data, error } = await supabase.from('menu').select(`id, img_url, name, price, tag, menu_category (id,title)`);

  if (error) {
    console.error(error.message);
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
  const { error } = await supabase.from('menu').insert(newMenu);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;
};

/**
 * 메뉴를 수정하는 함수
 * @param id - 수정할 메뉴 id
 * @param updatedMenu - 수정할 메뉴 정보
 * @returns
 */
export const updateMenu = async (id: string, updatedMenu: UpdateMenu) => {
  const { error } = await supabase.from('menu').update(updatedMenu).eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;
};

/**
 * 메뉴를 삭제하는 함수
 * @param id - 삭제할 메뉴 id
 * @returns
 */
export const deleteMenu = async (id: string) => {
  const { error } = await supabase.from('menu').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;
};

/**
 * 이미지를 스토리지에 업로드하는 함수
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지 url
 */
export const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage.from('images').upload(`menu/${file.name}`, file);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data.path;
};
