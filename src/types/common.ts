import { Tables } from '../../database.types';

// supabase
export type TableNum = Tables<'qr-order-table-list'>['tableNum'];
export type MenuList = Tables<'qr-order-menu'>;

export type Order = {
  id: string;
  orderList: {
    id: number;
    name: string;
    price: number;
    amount: number;
  }[];
  created_at: string;
};
