import supabase from '..';

/**
 * 메뉴를 삭제하는 함수
 * @param id - 삭제할 메뉴 id
 * @returns
 */
export const deleteMenu = async (id: string) => {
  const { error } = await supabase.from('menu').delete().eq('id', id);
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

/**
 * 요청을 삭제하는 함수
 * @param id - 삭제할 요청 id
 * @returns
 */
export const deleteRequest = async (id: string) => {
  const { error } = await supabase.from('request').delete().eq('id', id);
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
export const deleteTable = async (id: number) => {
  const { error } = await supabase.from('table').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 주문 아이템을 삭제하는 함수
 * @param id - 삭제할 주문 아이템 id
 * @returns
 */
export const deleteOrderItem = async (id: string) => {
  const { error } = await supabase.from('order_item').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 아이템을 삭제하는 함수
 * @param id - 삭제할 요청 아이템 id
 * @returns
 */
export const deleteRequestItem = async (id: string) => {
  const { error } = await supabase.from('request_item').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 메뉴 카테고리를 삭제하는 함수
 * @param id - 삭제할 메뉴 카테고리 id
 * @returns
 */
export const deleteMenuCategory = async (id: string) => {
  const { error } = await supabase.from('menu_category').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};

/**
 * 요청 카테고리를 삭제하는 함수
 * @param id - 삭제할 요청 카테고리 id
 * @returns
 */
export const deleteRequestCategory = async (id: string) => {
  const { error } = await supabase.from('request_categories').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
};
