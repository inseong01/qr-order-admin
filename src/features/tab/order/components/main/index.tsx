import { CardObj } from '@/utils/function/generate-card';
import styles from './index.module.css';

type CardMainProps = {
  order: CardObj;
};

export default function CardMain({ order }: CardMainProps) {
  return (
    <ul className={styles.middle}>
      {order.main?.map((o, idx) => {
        return (
          <li key={idx} className={styles.menuBox}>
            <div className={styles.menu}>
              <div className={styles.title}>{o.menu.name}</div>

              <div className={styles.amount}>x {o.quantity}</div>
            </div>

            <div className={styles.line}></div>
          </li>
        );
      })}
    </ul>
  );
}
