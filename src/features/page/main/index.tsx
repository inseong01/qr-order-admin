import { Suspense } from 'react';
import { useAtomValue } from 'jotai';

// import MainPageOrderTab from '../../../features/order/components/order-index';
import LoadingSpinner from '@/features/load/spinner';
import MainPageMenuTab from '@/features/tab/menu';
import MainPageTableTab from '@/features/tab/table';
import MenuModal from '@/features/modal/menu';
import Widget from '@/features/widget';

import { footerAtom } from '../footer';

import styles from './index.module.css';
import TableInfoPannel from '@/features/modal/table';

export default function Main() {
  const tab = useAtomValue(footerAtom) ?? 'menu';

  const component = {
    menu: MainPageMenuTab,
    table: MainPageTableTab,
    // order: MainPageOrderTab,
  };
  const MainPageComponent = component[tab];

  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingSpinner />}>
        {component ? (
          <>
            <div className={styles.leftBox}>
              <MainPageComponent />
            </div>

            <div className={styles.rightBox}>
              <Widget />

              {tab === 'menu' && <MenuModal />}
              {tab === 'table' && <TableInfoPannel />}
            </div>
          </>
        ) : (
          '예기치 않은 오류가 발생했습니다.'
        )}
      </Suspense>
    </main>
  );
}
