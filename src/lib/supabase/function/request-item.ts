import supabase from '..';
import { Tables } from '../database.types';

// request_item table type
export type RequestItem = Tables<'request_item'>;

/**
 * 요청 아이템 목록을 가져오는 함수
 * @returns 요청 아이템 목록
 */
export async function getRequestItemList(): Promise<RequestItem[]> {
  const { data, error } = await supabase.from('request_item').select('*').order('id', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
