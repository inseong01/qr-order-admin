import styles from '@/style/swiper/order/OrderListSlide.module.css';
import { useBoundStore } from '../../../../../lib/store/useBoundStore';
import { AllOrderList } from '../../../../../types/common';

export default function OrderListSlideTop({
  onClickOrderList,
  list,
}: {
  onClickOrderList: (list: AllOrderList) => () => void;
  list: AllOrderList;
}) {
  const categoryId = useBoundStore((state) => state.category.id);

  return (
    <div
      className={`${styles.topBox} ${categoryId === 1 ? styles.done : ''}`}
      onClick={onClickOrderList(list)}
    >
      <div className={styles.top}>
        <div className={styles.title}>#{list.orderNum}</div>
        <div className={styles.right}>
          <div className={styles.table}>테이블 {list.tableNum}</div>
        </div>
      </div>
    </div>
  );
}
