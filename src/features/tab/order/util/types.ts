import { Order } from '@/lib/supabase/tables/order';
import { OrderItem } from '@/lib/supabase/tables/order-item';

export type HeightType = 'full' | 'half';

export type CardObj = {
  isStart: boolean;
  isEnd: boolean;
  isDone: boolean | null;
  heightType: HeightType;
  header: {
    table: Order['table'];
    startAt: string;
    updatedAt: string;
    orderNumber: number;
  };
  main: { menu: OrderItem['menu']; quantity: number }[];
  footer: {
    orderId: string;
  };
};

export type FindOrderProps = {
  orders: Order[];
  orderId: string;
};

export type GenerateCardLayoutArrProps = {
  orders: Order[];
  orderItems: OrderItem[];
  maxHeight: number;
};
