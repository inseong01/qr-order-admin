import supabase from '..';
import { TablesInsert } from '../database.types';

// menu table type
type Menu = TablesInsert<'menu'>;
// order table type
type Order = TablesInsert<'order'>;
// request table type
type Request = TablesInsert<'request'>;
// table table type
type Table = TablesInsert<'table'>;
// order_item table type
type OrderItem = TablesInsert<'order_item'>;
// request_item table type
type RequestItem = TablesInsert<'request_item'>;
// menu_category table type
type MenuCategory = TablesInsert<'menu_category'>;
// request_categories table type
type RequestCategory = TablesInsert<'request_categories'>;

/**
 * 메뉴를 추가하는 함수
 * @param newMenu - 추가할 메뉴 정보
 * @returns 
 */
export const addMenu = async (newMenu: Menu) => {
  const { error } = await supabase.from('menu').insert(newMenu);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 주문을 추가하는 함수
 * @param newOrder - 추가할 주문 정보
 * @returns 
 */
export const addOrder = async (newOrder: Order) => {
  const { error } = await supabase.from('order').insert(newOrder);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청을 추가하는 함수
 * @param newRequest - 추가할 요청 정보
 * @returns 
 */
export const addRequest = async (newRequest: Request) => {
  const { error } = await supabase.from('request').insert(newRequest);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 테이블을 추가하는 함수
 * @param newTable - 추가할 테이블 정보
 * @returns 
 */
export const addTable = async (newTable: Table) => {
  const { error } = await supabase.from('table').insert(newTable);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 주문 아이템을 추가하는 함수
 * @param newOrderItem - 추가할 주문 아이템 정보
 * @returns 
 */
export const addOrderItem = async (newOrderItem: OrderItem) => {
  const { error } = await supabase.from('order_item').insert(newOrderItem);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 아이템을 추가하는 함수
 * @param newRequestItem - 추가할 요청 아이템 정보
 * @returns
 */
export const addRequestItem = async (newRequestItem: RequestItem) => {
  const { error } = await supabase.from('request_item').insert(newRequestItem);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 메뉴 카테고리를 추가하는 함수
 * @param newMenuCategory - 추가할 메뉴 카테고리 정보
 * @returns
 */
export const addMenuCategory = async (newMenuCategory: MenuCategory) => {
  const { error } = await supabase.from('menu_category').insert(newMenuCategory);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 카테고리를 추가하는 함수
 * @param newRequestCategory - 추가할 요청 카테고리 정보
 * @returns
 */
export const addRequestCategory = async (newRequestCategory: RequestCategory) => {
  const { error } = await supabase.from('request_categories').insert(newRequestCategory);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};
