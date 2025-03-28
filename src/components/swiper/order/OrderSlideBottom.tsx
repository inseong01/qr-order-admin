import styles from '@/style/swiper/order/OrderSlideBottom.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { AllOrderList } from '../../../types/common';
import OrderSlideSubmitBtn from './OrderSlideSubmitBtn';

export default function OrderSlideBottom({ list }: { list: AllOrderList }) {
  // store
  const categoryId = useBoundStore((state) => state.category.id);
  // variant
  const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);
  const isOrderPending = categoryId === 0;

  return (
    <div className={styles.bottomBox}>
      <div className={`${styles.bottom} ${categoryId === 1 ? styles.done : ''}`}>
        <div className={styles.totalMenuAmount}>
          <span>{amount}</span> 개
        </div>
        {isOrderPending && <OrderSlideSubmitBtn list={list} />}
      </div>
    </div>
  );
}
