import { useEffect, useState } from 'react';

import styles from './index.module.css';
import { CardObj } from '../../util/types';
import { getElapsed } from '../../util/get-elapsed';

type CardHeaderProps = {
  header: CardObj['header'];
  isDone: boolean;
};

export default function CardHeader({ header, isDone }: CardHeaderProps) {
  const elapsedRes = getElapsed(header);
  const [elapsedTime, setElapsedTime] = useState(elapsedRes.time);
  const [elapsedType, setElapsedType] = useState(elapsedRes.type);
  const [elapsedState, setElapsedState] = useState(elapsedRes.state);

  useEffect(() => {
    const tick = () => {
      setElapsedTime(getElapsed(header).time);
      setElapsedType(getElapsed(header).type);
      setElapsedState(getElapsed(header).state);
      setTimeout(tick, 1000);
    };

    tick();
  }, []);

  const formattedTime = new Date(header.startAt).toLocaleTimeString('ko-KR', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.topBox} data-finished={isDone}>
      {/* 상단 */}
      <div className={styles.top}>
        <div className={styles.title}>#{header.orderNumber}</div>

        <div className={styles.right}>
          <div className={styles.table}>{formattedTime}</div>
          <div className={styles.elapsed} data-state={elapsedState}>
            {elapsedTime}
            {elapsedType} 경과
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
