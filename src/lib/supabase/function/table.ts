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
 * 테이블을 추가하는 함수
 * @param newTable - 추가할 테이블 정보
 * @returns
 */
export const addTable = async (newTable: NewTable) => {
  const { error } = await supabase.from('table').insert(newTable);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 테이블 정보를 수정하는 함수
 * @param updatedTables - 수정된 테이블 배열
 * @returns
 */
export const updateTable = async (updatedTables: UpsertTable[]) => {
  const { error } = await supabase.from('table').upsert(updatedTables, { ignoreDuplicates: false });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 테이블을 삭제하는 함수
 * @param id - 삭제할 테이블 id
 * @returns
 */
export const deleteTable = async (id: string) => {
  const { error } = await supabase.from('table').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};
