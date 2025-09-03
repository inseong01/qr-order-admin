import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/window-atom';

import TabViewContainer from '@/features/tab';

import styles from './index.module.css';
import MainRightComponent from './right-index';
import { footerAtom } from '../footer';

export default function Main() {
  const tab = useAtomValue(footerAtom);
  const { isMobile } = useAtomValue(windowStateAtom);

  return (
    <main className={styles.main} data-empty={!tab}>
      {/* 좌측 */}
      <div className={styles.leftBox}>
        <TabViewContainer />
      </div>

      {/* 우측 */}
      {!isMobile && <MainRightComponent />}
    </main>
  );
}
