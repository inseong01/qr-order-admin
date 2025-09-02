import { lazy } from 'react';
import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/window-atom';

import TabViewContainer from '@/features/tab';

import styles from './index.module.css';
import { footerAtom } from '../footer';

const LazyMainRightComponent = lazy(() => import('./right-index'));

export default function Main() {
  const category = useAtomValue(footerAtom);
  const { isMobile } = useAtomValue(windowStateAtom);

  return (
    <main className={styles.main} data-empty={!category}>
      {/* 좌측 */}
      <div className={styles.leftBox}>
        <TabViewContainer />
      </div>

      {/* 우측 */}
      {!isMobile && <LazyMainRightComponent />}
    </main>
  );
}
