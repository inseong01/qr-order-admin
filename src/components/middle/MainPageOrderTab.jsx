import useQueryAllOrderList from '../../lib/hook/useQuery/useQueryAllOrderList';
import { useBoundStore } from '../../lib/store/useBoundStore';
import Loader from '../Loader';
import ConfirmModal from '../modal/ConfirmModal';
import OrderListSwiper from '../swiper/OrderListSwiper';

export default function MainPageOrderTab() {
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
      <ConfirmModal title={'주문'} />
    </>
  );
}
