import useQueryAllOrderList from '../../lib/hook/useQuery/useQueryAllOrderList';

export default function OrderCategoryAlert({ title }) {
  // hook
  // const { useQueryAllOrderList } = useQueryHook();
  const { data } = useQueryAllOrderList();
  // variant
  const notServedOrder = data?.filter((list) => !list.isDone).length;

  return <>{title === '접수' && (data?.length ? notServedOrder : 0)}</>;
}
