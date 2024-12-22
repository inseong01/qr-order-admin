import styles from '@/style/top/HeaderRight.module.css';
import CurrentTimer from './CurrentTimer';
import ServerStatus from './ServerStatus';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

export default function HeaderRight({ tabCategory }) {
  // function HeaderRight({ tabCategory, store }) {
  // console.log(store);
  // useState
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // 첫 렌더링 이후 렌더링 제한
    if (tabCategory.isLoading) return;
    setIsFirstRender(false);
  }, [tabCategory.isLoading]);

  return (
    <ul className={styles.right}>
      <li className={styles.time}>{!isFirstRender && <CurrentTimer />}</li>
      {/* <li className={styles.server}>{!isFirstRender && <ServerStatus />}</li> */}
    </ul>
  );
}

// export default connect((store) => ({ store }))(HeaderRight);
