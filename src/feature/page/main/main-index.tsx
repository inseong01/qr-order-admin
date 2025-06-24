import { lazy, Suspense } from 'react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import styles from './main-index.module.css';

import LoadingSpinner from '../../load/spinner/spinner-index';
import MainPageMenuTab from '../../tab/menu/menu-index';

export default function Main() {
  const tab = useBoundStore((state) => state.tab.title);

  const component = {
    menu: MainPageMenuTab,
    table: lazy(() => import('./../../tab/table/table-index')),
    order: lazy(() => import('./../../tab/order/order-index')),
  };
  const MainPageComponent = component[tab];

  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingSpinner />}>
        {component ? <MainPageComponent /> : '예기치 않은 오류가 발생했습니다.'}
      </Suspense>
    </main>
  );
}
