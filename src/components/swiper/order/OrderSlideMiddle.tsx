import styles from '@/style/swiper/order/OrderMiddleBox.module.css';
import { Order } from '../../../types/common';

export default function OrderSlideMiddle({ orderList }: { orderList: Order['orderList'] }) {
  return (
    <div className={styles.middleBox}>
      <ul className={styles.middle}>
        <MenuListComponent orderList={orderList} />
      </ul>
    </div>
  );
}

function MenuListComponent({ orderList }: { orderList: Order['orderList'] }) {
  return (
    <>
      {orderList.map((menu, idx) => {
        return (
          <li key={idx} className={styles.menuBox}>
            <div className={styles.menu}>
              <div className={styles.title}>{menu.name}</div>
              <div className={styles.amount}>{menu.amount}</div>
            </div>
          </li>
        );
      })}
    </>
  );
}
