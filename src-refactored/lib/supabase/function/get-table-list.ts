import supabase from '..';
import { Tables } from '../database.types';

// table table type
type TableList = Tables<'table'>;

/**
 * 테이블 목록을 가져오는 함수
 * @returns 테이블 목록
 */
export async function getTableList(): Promise<TableList[]> {
  const { data, error } = await supabase.from('table').select('*').order('number', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
