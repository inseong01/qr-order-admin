import styles from '@/style/swiper/order/ListSlideBottom.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import ListSlideSubmitBtn from './ListSlideSubmitBtn';

export default function ListSlideBottom({ list }) {
  // store
  const categoryId = useBoundStore((state) => state.category.id);
  // variant
  const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);

  return (
    <div className={styles.bottomBox}>
      <div className={`${styles.bottom} ${categoryId === 1 ? styles.done : ''}`}>
        <div className={styles.totalMenuAmount}>
          <span>{amount}</span> 개
        </div>
        {categoryId === 0 && <ListSlideSubmitBtn list={list} />}
      </div>
    </div>
  );
}
