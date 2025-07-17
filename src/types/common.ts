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
