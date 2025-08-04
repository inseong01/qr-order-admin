import supabase from '..';
import { TablesUpdate } from '../database.types';

// order table type
export type Order = {
  created_at: string;
  id: string;
  is_done: boolean;
  order_number: number;
  table: { id: string; number: number };
  updated_at: string | null;
};
export type UpdateOrder = TablesUpdate<'order'>;

/**
 * 주문 목록을 가져오는 함수
 * @returns 주문 목록
 */
export async function getOrderList(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('order')
    .select(
      `
    created_at,
    id,
    is_done,
    order_number,
    table(id, number),
    updated_at
    `
    )
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * 주문 완료 처리하는 함수
 * @param id - 완료할 주문 id
 * @returns
 */
export const completeOrder = async (id: string) => {
  const { error } = await supabase
    .from('order')
    .update({ is_done: true, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;
};

/**
 * 주문을 삭제하는 함수
 * @param id - 삭제할 주문 id
 * @returns
 */
export const deleteOrder = async (id: string) => {
  const { error } = await supabase.from('order').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;
};
