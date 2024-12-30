import styles from '@/style/top/HeaderLeft.module.css';
import getTabCategory from '@/lib/supabase/func/getTabCategory';
import HeaderCategorySwiper from '../swiper/HeaderCategorySwiper';
import AddCategoryBox from './AddCategoryBox';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export default function HeaderLeft() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // useQueries
  const tabCategory = useQuery({
    queryKey: ['tabCategory', tab, isSubmit],
    queryFn: () => getTabCategory(tab),
    initialData: [],
  });

  if (tabCategory.isFetching) {
    return <div className={styles.left}></div>;
  }

  return (
    <div className={styles.left}>
      <HeaderCategorySwiper tabCategory={tabCategory.data} />
      <AddCategoryBox />
    </div>
  );
}
