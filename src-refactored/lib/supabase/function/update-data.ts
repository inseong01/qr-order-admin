import supabase from '..';
import { TablesUpdate } from '../database.types';

// menu table type
type Menu = TablesUpdate<'menu'>;
// table table type
type Table = TablesUpdate<'table'>;
// order table type
type Order = TablesUpdate<'order'>;
// request table type
type Request = TablesUpdate<'request'>;
// order_item table type
type OrderItem = TablesUpdate<'order_item'>;
// request_item table type
type RequestItem = TablesUpdate<'request_item'>;
// menu_category table type
type MenuCategory = TablesUpdate<'menu_category'>;
// request_categories table type
type RequestCategory = TablesUpdate<'request_categories'>;

/**
 * 메뉴를 수정하는 함수
 * @param id - 수정할 메뉴 id
 * @param updatedMenu - 수정할 메뉴 정보
 * @returns
 */
export const updateMenu = async (id: string, updatedMenu: Menu) => {
  const { error } = await supabase.from('menu').update(updatedMenu).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 테이블 정보를 수정하는 함수
 * @param id - 수정할 테이블 id
 * @param updatedTable - 수정할 테이블 정보
 * @returns
 */
export const updateTable = async (id: number, updatedTable: Table) => {
  const { error } = await supabase.from('table').update(updatedTable).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 주문 정보를 수정하는 함수
 * @param id - 수정할 주문 id
 * @param updatedOrder - 수정할 주문 정보
 * @returns
 */
export const updateOrder = async (id: string, updatedOrder: Order) => {
  const { error } = await supabase.from('order').update(updatedOrder).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 정보를 수정하는 함수
 * @param id - 수정할 요청 id
 * @param updatedRequest - 수정할 요청 정보
 * @returns
 */
export const updateRequest = async (id: string, updatedRequest: Request) => {
  const { error } = await supabase.from('request').update(updatedRequest).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 주문 아이템 정보를 수정하는 함수
 * @param id - 수정할 주문 아이템 id
 * @param updatedOrderItem - 수정할 주문 아이템 정보
 * @returns
 */
export const updateOrderItem = async (id: string, updatedOrderItem: OrderItem) => {
  const { error } = await supabase.from('order_item').update(updatedOrderItem).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 아이템 정보를 수정하는 함수
 * @param id - 수정할 요청 아이템 id
 * @param updatedRequestItem - 수정할 요청 아이템 정보
 * @returns
 */
export const updateRequestItem = async (id: string, updatedRequestItem: RequestItem) => {
  const { error } = await supabase.from('request_item').update(updatedRequestItem).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 메뉴 카테고리 정보를 수정하는 함수
 * @param id - 수정할 메뉴 카테고리 id
 * @param updatedMenuCategory - 수정할 메뉴 카테고리 정보
 * @returns
 */
export const updateMenuCategory = async (id: string, updatedMenuCategory: MenuCategory) => {
  const { error } = await supabase.from('menu_category').update(updatedMenuCategory).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 카테고리 정보를 수정하는 함수
 * @param id - 수정할 요청 카테고리 id
 * @param updatedRequestCategory - 수정할 요청 카테고리 정보
 * @returns
 */
export const updateRequestCategory = async (id: string, updatedRequestCategory: RequestCategory) => {
  const { error } = await supabase.from('request_categories').update(updatedRequestCategory).eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};
