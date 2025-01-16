import styles from '@/style/top/HeaderRight.module.css';
import CurrentTimer from './CurrentTimer';

import { useEffect, useState } from 'react';

export default function HeaderRight() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  // 첫 렌더링 이후 렌더링 제한
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <ul className={styles.right}>{!isFirstRender && <li className={styles.time}>{<CurrentTimer />}</li>}</ul>
  );
}
