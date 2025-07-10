import { Suspense } from 'react';
import { useAtomValue } from 'jotai';

import TabModalContainer from '@/features/modal/tab';
import { tabModalAtom } from '@/features/modal/tab/store/atom';
import { MenuTabView, OrderTabView, TableTabView } from '@/features/tab';
import LoadingSpinner from '@/features/load/spinner';
import Widget from '@/features/widget';

import { footerAtom } from '../footer';
import styles from './index.module.css';

export default function Main() {
  const tab = useAtomValue(footerAtom);
  const isTabModalNull = useAtomValue(tabModalAtom);

  const component = {
    menu: MenuTabView,
    table: TableTabView,
    order: OrderTabView,
  };
  const MainPageComponent = component[tab];
  const calcedWidth = isTabModalNull ? 'calc(100% - 350px)' : '100%';

  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingSpinner />}>
        {component ? (
          <>
            <div className={styles.leftBox} style={{ width: calcedWidth }}>
              <MainPageComponent />
            </div>

            <div className={styles.rightBox}>
              {/* 위젯 */}
              <Widget />

              {/* 탭 모달 */}
              <TabModalContainer />
            </div>
          </>
        ) : (
          '예기치 않은 오류가 발생했습니다.'
        )}
      </Suspense>
    </main>
  );
}
