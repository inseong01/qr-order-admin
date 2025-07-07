import { Suspense } from 'react';
import { useAtomValue } from 'jotai';

import LoadingSpinner from '../../load/spinner/spinner-index';
import MainPageMenuTab from '../../../features/menu/components';
import MainPageOrderTab from '../../../features/order/components/order-index';
import MainPageTableTab from '../../../features/table/components/table-index';

import { footerAtom } from '../footer';

import styles from './main-index.module.css';

export default function Main() {
  const tab = useAtomValue(footerAtom) ?? 'menu';

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
