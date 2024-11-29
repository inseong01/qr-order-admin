'use client';

import styles from '@/style/Header.module.css';
import HeaderLeft from './top/HeaderLeft';
import HeaderRight from './top/HeaderRight';
import getTabCategory from '@/lib/supabase/func/getTabCategory';
import getAllOrderList from '@/lib/supabase/func/getAllOrderList';

import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';

export default function Header() {
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  // useQueries
  const [tabCategory, allOrderList] = useQueries({
    queries: [
      {
        queryKey: ['tabCategory', tab],
        queryFn: () => getTabCategory(tab),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['allOrderList', tab],
        queryFn: () => getAllOrderList(tab, { key: 1 }),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
      },
    ],
  });

  return (
    <header className={styles.header}>
      <HeaderLeft tab={tab} tabCategory={tabCategory} allOrderList={allOrderList} />
      <HeaderRight tabCategory={tabCategory} />
    </header>
  );
}
