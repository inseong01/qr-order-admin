import supabase from '..';
import { Tables, TablesUpdate } from '../database.types';

// order table type
export type Order = Tables<'order'>;
export type UpdateOrder = TablesUpdate<'order'>;

/**
 * 주문 목록을 가져오는 함수
 * @returns 주문 목록
 */
export async function getOrderList(): Promise<Order[]> {
  const { data, error } = await supabase.from('order').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * 주문 정보를 수정하는 함수
 * @param id - 수정할 주문 id
 * @param updatedOrder - 수정할 주문 정보
 * @returns
 */
export const updateOrder = async (id: string, updatedOrder: UpdateOrder) => {
  const { error } = await supabase.from('order').update(updatedOrder).eq('id', id);
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
