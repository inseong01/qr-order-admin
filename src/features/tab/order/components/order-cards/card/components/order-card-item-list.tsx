
import menuDummy from '@/mock/menu.test.json';
import { OrderItem } from '@/lib/supabase/function/order-item';

import styles from './order-card-item-list.module.css';

interface OrderCardItemListProps {
  orderItems: OrderItem[];
}

export default function OrderCardItemList({ orderItems }: OrderCardItemListProps) {
  return (
    <div className={styles.middleBox}>
      <ul className={styles.middle}>
        {orderItems.map((o, idx) => {
          const menu = menuDummy.find((m) => m.id === o.menu_id);

          return (
            <li key={idx} className={styles.menuBox}>
              <div className={styles.menu}>
                <div className={styles.title}>{menu?.name}</div>
                <div className={styles.amount}>{o.quantity}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
