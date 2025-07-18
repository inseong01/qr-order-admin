import supabase from '..';

// order_item table with relations type
export type OrderItem = {
  id: string;
  menu: {
    id: string;
    name: string;
    price: number;
  };
  order: {
    id: string;
    is_done: boolean;
    order_number: number;
    table: {
      id: string;
      number: number;
    };
  };
  quantity: number;
};

/**
 * 주문 아이템 목록을 가져오는 함수
 * @param order_id 주문 아이디
 * @returns 주문 아이템 목록
 */
export async function getOrderItemList(): Promise<OrderItem[]> {
  const { data, error } = await supabase.from('order_item').select(
    `
    id, 
    menu(
      id, 
      name, 
      price
    ),
    order(
      id,
      is_done,
      order_number,
      table(
        id,
        number
      )
     ),
     quantity
    `
  );

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
