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
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // useQueries
  const [tabCategory, orderList] = useQueries({
    queries: [
      {
        queryKey: ['tabCategory', tab, isSubmit],
        queryFn: () => getTabCategory(tab),
        enabled: !!tab,
        initialData: [{ sort: '전체메뉴', id: 1 }],
      },
      {
        queryKey: ['orderList', isSubmit],
        queryFn: () => getAllOrderList(tab),
        enabled: tab === 'order',
        initialData: [],
      },
    ],
  });

  return (
    <header className={styles.header}>
      <HeaderLeft
        tab={tab}
        tabCategory={tabCategory}
        orderList={orderList?.data.filter((list) => !list.isDone)}
      />
      <HeaderRight tabCategory={tabCategory} />
    </header>
  );
}
