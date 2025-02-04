import { Tables } from '../../../database.types';
import useQueryAllOrderList from '../../lib/hook/useQuery/useQueryAllOrderList';

export default function OrderCategoryAlert({ title }: { title: string }) {
  // hook
  const { data } = useQueryAllOrderList();
  // variant
  const notServedOrder = data?.data
    ? data.data.filter((list: Tables<'qr-order-allOrderList'>) => !list.isDone).length
    : 0;

  return <>{title === '접수' && <div>{notServedOrder ? notServedOrder : null}</div>}</>;
}
