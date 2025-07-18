import supabase from '..';
import { TablesUpdate } from '../database.types';

// request table type
export type Request = {
  created_at: string;
  id: string;
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
    created_at,
    id,
    is_read,
    table(id, number)
    `
    )
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
 * @returns
 */
export const updateRequest = async (id: string) => {
  const { error } = await supabase.from('request').update({ is_read: true }).eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;
};
