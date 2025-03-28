import { Tables, TablesInsert, TablesUpdate } from '../../database.types';
import { Status } from '../lib/hook/useSubscribeDBTable';

// variant
export type ConfirmModalTitle = '주문' | '카테고리';
export type AdminId = 'store_1';
export type InitLoadState = {
  isCompleted: boolean;
  isLoading: boolean;
  isMounted: boolean;
  isError: boolean;
  initialLoadstatus: Status;
};

// supabase
export type AllOrderList = Tables<'qr-order-allOrderList'>;
export type UpdateAllOrderList = TablesUpdate<'qr-order-allOrderList'>;
export type TableList = Tables<'qr-order-table-list'>;
export type TableNum = Tables<'qr-order-table-list'>['tableNum'];
export type MenuList = Tables<'qr-order-menu'>;
export type RequestList = Tables<'qr-order-request-list'>;
export type MenuCategoryList = Tables<'qr-order-category-menu'>;
export type InsertMenuCategoryList = TablesInsert<'qr-order-category-menu'>;
export type TabCategoryList = Tables<'qr-order-category-tab'>;
export type TableCategoryList = Tables<'qr-order-category-table'>;
export type OrderCategoryList = Tables<'qr-order-category-order'>;

// qr-order-allOrderList
export type Order = {
  id: string;
  orderList: MenuOrderList[];
  created_at: string;
};
type MenuOrderList = {
  id: number;
  name: string;
  price: number;
  amount: number;
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
