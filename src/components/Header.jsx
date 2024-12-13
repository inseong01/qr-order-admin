import styles from '@/style/Header.module.css';
import HeaderLeft from './top/HeaderLeft';
import HeaderRight from './top/HeaderRight';
import getTabCategory from '@/lib/supabase/func/getTabCategory';
import fetchOrderList from '../lib/supabase/func/fetchOrderList';

import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';

export default function Header() {
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const trigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  // useQueries
  const [tabCategory, allOrderList] = useQueries({
    queries: [
      {
        queryKey: ['tabCategory', tab, isSubmit],
        queryFn: () => getTabCategory(tab),
        enabled: !!tab,
        initialData: [{ sort: '전체메뉴', id: 1 }],
      },
      {
        queryKey: ['allOrderList', trigger],
        queryFn: () => fetchOrderList('select'),
        initialData: [],
      },
    ],
  });

  return (
    <header className={styles.header}>
      <HeaderLeft tab={tab} tabCategory={tabCategory} allOrderList={allOrderList.data} />
      <HeaderRight tabCategory={tabCategory} />
    </header>
  );
}
