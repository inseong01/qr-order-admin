import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import HeaderCategoryBox from './HeaderCategoryBox';

import { motion } from 'motion/react';
import { lazy, Suspense } from 'react';

const LazyOrderCategoryAlert = lazy(() => import('../../top/OrderCategoryAlert'));

function TitleBox({ list }) {
  return (
    <>
      <motion.div className={styles.title} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>{list.title}</div>
        <Suspense>
          <LazyOrderCategoryAlert title={list.title} />
        </Suspense>
      </motion.div>
    </>
  );
}

export default function HeaderCategory({ list }) {
  return (
    <HeaderCategoryBox list={list}>
      <TitleBox list={list} />
    </HeaderCategoryBox>
  );
}
