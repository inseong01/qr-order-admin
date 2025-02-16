import styles from '@/style/swiper/order/OrderListSlide.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { AllOrderList } from '../../../types/common';
import ListSlideBottom from './ListSlideBottom';
import ListSlideOption from './ListSlideOption';
import OrderMiddleBox from './OrderMiddleBox';

export default function OrderListSlide({ list }: { list: AllOrderList }) {
  // store
  const categoryId = useBoundStore((state) => state.category.id);
  const submitError = useBoundStore((state) => state.submit.isError);
  const getSelectedListId = useBoundStore((state) => state.getSelectedListId);

  function onClickOpenListOption(list: AllOrderList) {
    return () => {
      if (submitError) return;
      // "접수"일 때만 실행
      if (categoryId === 0) {
        getSelectedListId({ selectedListId: list.id });
      }
    };
  }

  return (
    <li className={styles.slide}>
      <div
        className={`${styles.topBox} ${categoryId === 1 ? styles.done : ''}`}
        onClick={onClickOpenListOption(list)}
      >
        <div className={styles.top}>
          <div className={styles.title}>#{list.orderNum}</div>
          <div className={styles.right}>
            <div className={styles.table}>테이블 {list.tableNum}</div>
          </div>
        </div>
      </div>
      <OrderMiddleBox orderList={list.orderList} />
      <ListSlideBottom list={list} />
      <ListSlideOption list={list} />
    </li>
  );
}
