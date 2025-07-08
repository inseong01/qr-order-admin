import supabase from '..';
import { Tables, TablesInsert, TablesUpdate } from '../database.types';

// request_categories table type
type RequestCategory = Tables<'request_categories'>;
type NewRequestCategory = TablesInsert<'request_categories'>;
type UpdateRequestCategory = TablesUpdate<'request_categories'>;

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

/**
 * 요청 카테고리를 추가하는 함수
 * @param newRequestCategory - 추가할 요청 카테고리 정보
 * @returns
 */
export const addRequestCategory = async (newRequestCategory: NewRequestCategory) => {
  const { error } = await supabase.from('request_categories').insert(newRequestCategory);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 카테고리 정보를 수정하는 함수
 * @param id - 수정할 요청 카테고리 id
 * @param updatedRequestCategory - 수정할 요청 카테고리 정보
 * @returns
 */
export const updateRequestCategory = async (id: string, updatedRequestCategory: UpdateRequestCategory) => {
  const { error } = await supabase.from('request_categories').update(updatedRequestCategory).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 카테고리를 삭제하는 함수
 * @param id - 삭제할 요청 카테고리 id
 * @returns
 */
export const deleteRequestCategory = async (id: string) => {
  const { error } = await supabase.from('request_categories').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};
