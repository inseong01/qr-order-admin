import supabase from '..';
import { Tables, TablesInsert, TablesUpdate } from '../database.types';

// order_item table type
type OrderItem = Tables<'order_item'>;

/**
 * 주문 아이템 목록을 가져오는 함수
 * @returns 주문 아이템 목록
 */
export async function getOrderItemList(): Promise<OrderItem[]> {
  const { data, error } = await supabase.from('order_item').select('*');

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
