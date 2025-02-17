import useQueryAllOrderList from '../../lib/hook/useQuery/useQueryAllOrderList';
import { AllOrderList } from '../../types/common';

export default function OrderCategoryAlert({ title }: { title: string }) {
  // hook
  const { data } = useQueryAllOrderList();
  // variant
  const notServedOrder = data ? data.filter((list: AllOrderList) => !list.isDone).length : 0;

  return <>{title === '접수' && <div>{notServedOrder ? notServedOrder : null}</div>}</>;
}
