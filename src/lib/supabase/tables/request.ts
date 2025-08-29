import supabase from '..';
import { TablesUpdate } from '../database.types';

// request table type
export type Request = {
  id: string;
  created_at: string;
  is_read: boolean;
  table: {
    id: string;
    number: number;
  };
};
export type UpdateRequest = TablesUpdate<'request'>;

/**
 * 요청 목록을 가져오는 함수
 * @returns 요청 목록
 */
export async function getRequestList(): Promise<Request[]> {
  const { data, error } = await supabase
    .from('request')
    .select(
      `
    id,
    created_at,
    is_read,
    table(id, number)
    `
    )
    .eq('is_read', false)
    .order('created_at', { ascending: true });

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * 요청 정보를 수정하는 함수
 * @param id - 수정할 요청 id
 * @returns
 */
export const updateRequest = async (id: string) => {
  const { error, data } = await supabase.from('request').update({ is_read: true }).eq('id', id).select();

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  // 조건에 맞는 행이 없거나 RLS 정책에 의해 접근이 거부된 경우
  if (!data.length) {
    console.error('Update failed: No rows matched the condition.');
    throw new Error('Unable to update the request.');
  }

  return;
};
