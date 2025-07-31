import { CardObj } from '@/utils/function/generate-card';
import styles from './index.module.css';
import { getElapsed } from '@/utils/function/get-elapsed';

type CardHeaderProps = {
  header: CardObj['header'];
};

export default function CardHeader({ header }: CardHeaderProps) {
  const elapsedData = getElapsed(header);

  return (
    <div className={styles.topBox}>
      {/* 상단 */}
      <div className={styles.top}>
        <div className={styles.title}>#{header.orderNumber}</div>

        <div className={styles.right}>
          <div className={styles.table}>00:00</div>
          <div className={styles.elapsed} data-state={elapsedData.state}>
            {elapsedData.elapsed}
            {elapsedData.type} 경과
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div className={styles.bottom}>
        <div className={styles.table}>테이블 {header.table.number}</div>
      </div>
    </div>
  );
}
