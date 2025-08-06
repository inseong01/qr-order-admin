import supabase from '..';
import { Tables, TablesInsert } from '../database.types';

// table table type
export type Table = Tables<'table'>;
export type NewTable = TablesInsert<'table'>;
export type UpsertTable = TablesInsert<'table'>;

/**
 * 테이블 목록을 가져오는 함수
 * @returns 테이블 목록
 */
export async function getTableList(): Promise<Table[]> {
  const { data, error } = await supabase.from('table').select('*').order('number', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * 테이블 정보를 삽입/수정하는 함수
 * @param updatedTables - 수정된 테이블 배열
 * @returns
 */
export const upsertTable = async (updatedTables: UpsertTable[]) => {
  const { error } = await supabase.from('table').upsert(updatedTables, { ignoreDuplicates: false });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;
};

/**
 * 테이블을 삭제하는 함수
 * @param ids - 삭제할 테이블 ids 배열
 * @returns
 */
export const deleteTable = async (ids: string[]) => {
  const { error, data } = await supabase.from('table').delete().in('id', ids).select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  // 조건에 맞는 행이 없거나 RLS 정책에 의해 접근이 거부된 경우
  if (!data.length) {
    console.error('Delete failed: No rows matched the condition.');
    throw new Error('Unable to delete the table.');
  }

  return;
};
