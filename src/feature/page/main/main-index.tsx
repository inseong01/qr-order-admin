import { Suspense } from 'react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import styles from './main-index.module.css';

import LoadingSpinner from '../../load/spinner/spinner-index';
import MainPageMenuTab from '../../tab/menu/menu-index';
import MainPageOrderTab from '../../tab/order/order-index';
import MainPageTableTab from '../../tab/table/table-index';

export default function Main() {
  const tab = useBoundStore((state) => state.tab.title);

  const component = {
    menu: MainPageMenuTab,
    table: MainPageTableTab,
    order: MainPageOrderTab,
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
