import styles from '@/style/swiper/order/OrderListSlide.module.css';
import { getSelectedListId } from '../../../lib/features/itemState/itemSlice';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import ListSlideBottom from './ListSlideBottom';
import ListSlideOption from './ListSlideOption';
import OrderMiddleBox from './OrderMiddleBox';

import { useDispatch, useSelector } from 'react-redux';

export default function OrderListSlide({ list }) {
  // useSelector
  // const categoryId = useSelector((state) => state.categoryState.id);
  // store
  const categoryId = useBoundStore((state) => state.category.id);
  // useDispatch
  const dispatch = useDispatch();

  function onClickOpenListOption(list) {
    return () => {
      // "접수"일 때만 실행
      if (categoryId === 0) {
        dispatch(getSelectedListId({ selectedListId: list.id }));
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
