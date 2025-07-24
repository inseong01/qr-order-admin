import { atom, useAtomValue } from 'jotai';

import Timer from '@/features/timer';

import { footerAtom } from '../footer';
import HeaderMenuTab from './header-menu';
import HeaderTableTab from './header-table';
import HeaderOrderTab from './header-order';
import styles from './index.module.css';

export const headerTabIdxAtom = atom(0);

export default function Header() {
  const footerTab = useAtomValue(footerAtom);
  const component = {
    menu: HeaderMenuTab,
    table: HeaderTableTab,
    order: HeaderOrderTab,
  };
  const HeaderTabList = component[footerTab];

  return (
    <header className={styles.header}>
      {/* 탭 목록 */}
      <ul className={styles.categories}>
        <HeaderTabList />
      </ul>

      {/* 현재 시간 */}
      <Timer />
    </header>
  );
}
