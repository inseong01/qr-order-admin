import { useAtomValue } from 'jotai';
import { lazy, Suspense } from 'react';

import Timer from '@/features/timer';

import styles from './index.module.css';
import HeaderMenuTab from './tab/menu';
import LogoutButton from './button/logout';
import { footerAtom } from '../footer/store/atom';

const LazyHeaderTableTab = lazy(() => import('./tab/table'));
const LazyHeaderOrderTab = lazy(() => import('./tab/order'));

export default function Header() {
  const footerTab = useAtomValue(footerAtom);
  const component = {
    menu: HeaderMenuTab,
    table: LazyHeaderTableTab,
    order: LazyHeaderOrderTab,
  };
  const HeaderTabList = component[footerTab];

  return (
    <header className={styles.header}>
      {/* 탭 목록 */}
      <ul className={styles.categories}>
        <Suspense fallback={null}>
          <HeaderTabList />
        </Suspense>
      </ul>

      <ul className={styles.rightSection}>
        {/* 현재 시간 */}
        <Timer />

        {/* 로그아웃 */}
        <LogoutButton />
      </ul>
    </header>
  );
}
