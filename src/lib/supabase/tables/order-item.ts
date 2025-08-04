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
 * 주문 메뉴 목록을 가져오는 함수
 * @returns 주문 메뉴 목록
 */
export async function getOrderItems(): Promise<OrderItem[]> {
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
