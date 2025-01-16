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
  const doneOrderList = data.data ? data.data.filter((arr) => arr.isDone) : [];
  const notDoneOrderList = data.data ? data.data.filter((arr) => !arr.isDone) : [];
  const descDoneOrderList = [...doneOrderList].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  if (isLoading) return <Loader />;

  return (
    <>
      {selectedCategory.id === 0 ? (
        <OrderListSwiper orderList={notDoneOrderList} />
      ) : (
        <OrderListSwiper orderList={descDoneOrderList} />
      )}
    </>
  );
}
