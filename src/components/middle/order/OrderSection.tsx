import useQueryAllOrderList from '../../../lib/hook/useQuery/useQueryAllOrderList';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import OrderListSwiper from '../../swiper/order/OrderListSwiper';
import Loader from '../../Loader';

export default function OrderSection() {
  // store
  const selectedCategory = useBoundStore((state) => state.category);
  // hook
  const { data, isLoading } = useQueryAllOrderList();
  // variant
  const doneOrderList = data ? data.filter((arr) => arr.isDone) : [];
  const notDoneOrderList = data ? data.filter((arr) => !arr.isDone) : [];
  const ascNotDoneList = [...notDoneOrderList].sort((a, b) => a.orderNum - b.orderNum);
  const descDoneList = [...doneOrderList].sort(
    (a, b) => new Date(b.updated_at as Date).getTime() - new Date(a.updated_at as Date).getTime()
  );

  if (isLoading) return <Loader />;

  return (
    <>
      {selectedCategory.id === 0 ? (
        <OrderListSwiper orderList={ascNotDoneList} />
      ) : (
        <OrderListSwiper orderList={descDoneList} />
      )}
    </>
  );
}
