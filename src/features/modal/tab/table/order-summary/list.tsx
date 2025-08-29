import { OrderItem } from '@/lib/supabase/tables/order-item';

import styles from './index.module.css';

export default function ListComponent({ order }: { order: OrderItem }) {
  const { menu, quantity } = order;
  const price = (menu.price * quantity).toLocaleString();

  return (
    <li className={styles.list}>
      {/* 이름 */}
      <div className={styles.menuBox}>
        <div className={styles.name}>{menu.name}</div>
      </div>

      {/* 가격 */}
      <div className={styles.priceBox}>
        <div className={styles.amount}>{quantity}</div>x<div className={styles.price}>{price}원</div>
      </div>
    </li>
  );
}
