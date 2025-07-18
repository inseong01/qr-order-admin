import { Order } from '@/lib/supabase/function/order';
import { useQueryOrderList } from '@/hooks/use-query/query';

import styles from './order-card-item-list.module.css';

export default function OrderCardItemList({ order }: { order: Order }) {
  const { data } = useQueryOrderList();
  const currentOrderList = data?.filter((d) => d.order.id === order.id);

  return (
    <div className={styles.middleBox}>
      <ul className={styles.middle}>
        {currentOrderList?.map((o, idx) => {
          return (
            <li key={idx} className={styles.menuBox}>
              <div className={styles.menu}>
                <div className={styles.title}>{o?.menu?.name}</div>
                <div className={styles.amount}>{o.quantity}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
