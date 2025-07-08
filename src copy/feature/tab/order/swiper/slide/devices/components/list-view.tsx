import { AllOrderList } from '../../../../../../../types/common';

import styles from './list-view.module.css';

export default function OrderListView({ orderList }: { orderList: AllOrderList['orderList'] }) {
  return (
    <div className={styles.middleBox}>
      <ul className={styles.middle}>
        {orderList.map((menu, idx) => {
          return (
            <li key={idx} className={styles.menuBox}>
              <div className={styles.menu}>
                {/* 메뉴명 */}
                <div className={styles.title}>{menu.name}</div>

                {/* 수량 */}
                <div className={styles.amount}>{menu.amount}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
