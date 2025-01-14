import useQueryAllOrderList from '../../lib/hook/useQuery/useQueryAllOrderList';

export default function OrderCategoryAlert({ title }) {
  // hook
  const { data } = useQueryAllOrderList();
  // variant
  const notServedOrder = data?.data ? data.data.filter((list) => !list.isDone).length : 0;

  return <>{title === '접수' && <div>{notServedOrder ? notServedOrder : null}</div>}</>;
}
