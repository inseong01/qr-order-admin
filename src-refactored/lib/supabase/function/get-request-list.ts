import supabase from '..';
import { Tables } from '../database.types';

// request_item table type
type RequestItemList = Tables<'request_item'>;
// request table type
type RequestList = Tables<'request'>;

/**
 * 요청 목록을 가져오는 함수
 * @returns 요청 목록
 */
export async function getRequestList(): Promise<RequestList[]> {
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
 * 요청 아이템 목록을 가져오는 함수
 * @returns 요청 아이템 목록
 */
export async function getRequestItemList(): Promise<RequestItemList[]> {
  const { data, error } = await supabase.from('request_item').select('*').order('id', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
