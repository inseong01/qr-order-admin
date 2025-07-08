import supabase from '..';
import { Tables, TablesUpdate } from '../database.types';

// request table type
export type Request = Tables<'request'>;
export type UpdateRequest = TablesUpdate<'request'>;

/**
 * 요청 목록을 가져오는 함수
 * @returns 요청 목록
 */
export async function getRequestList(): Promise<Request[]> {
  const { data, error } = await supabase
    .from('request')
    .select('*')
    .eq('is_read', false)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * 요청 정보를 수정하는 함수
 * @param id - 수정할 요청 id
 * @param updatedRequest - 수정할 요청 정보
 * @returns
 */
export const updateRequest = async (id: string, updatedRequest: UpdateRequest) => {
  const { error } = await supabase.from('request').update(updatedRequest).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청을 삭제하는 함수
 * @param id - 삭제할 요청 id
 * @returns
 */
export const deleteRequest = async (id: string) => {
  const { error } = await supabase.from('request').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};
