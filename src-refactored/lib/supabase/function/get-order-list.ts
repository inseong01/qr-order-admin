import supabase from '..';
import { Tables } from '../database.types';

// order_item table type
type OrderItemList = Tables<'order_item'>;
// order table type
type OrderList = Tables<'order'>;

/**
 * 주문 목록을 가져오는 함수
 * @returns 주문 목록
 */
export async function getOrderList(): Promise<OrderList[]> {
  const { data, error } = await supabase.from('order').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * 주문 아이템 목록을 가져오는 함수
 * @returns 주문 아이템 목록
 */
export async function getOrderItemList(): Promise<OrderItemList[]> {
  const { data, error } = await supabase.from('order_item').select('*').order('id', { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
