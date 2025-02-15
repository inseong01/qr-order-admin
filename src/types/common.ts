import { Tables } from '../../database.types';

// supabase
export type TableList = Tables<'qr-order-table-list'>;
export type TableNum = Tables<'qr-order-table-list'>['tableNum'];
export type MenuList = Tables<'qr-order-menu'>;
export type RequestList = Tables<'qr-order-request-list'>;

// qr-order-allOrderList
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

// qr-order-table-list
type TableText = {
  width: number;
};
type Line = {
  points: [number, number, number, number];
};
export type Bottom = {
  y: number;
  line: Line;
  priceText: {
    width: number;
  };
};
export type TableInit = {
  x: number;
  y: number;
  rec: {
    width: number;
    height: number;
  };
  tableText: TableText;
  bottom: Bottom;
};
