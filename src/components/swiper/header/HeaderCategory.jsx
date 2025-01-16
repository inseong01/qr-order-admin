import styles from '@/style/swiper/header/HeaderCategorySwiper.module.css';
import HeaderCategoryBox from './HeaderCategoryBox';
import OrderCategoryAlert from '../../top/OrderCategoryAlert';

import { motion } from 'motion/react';

function TitleBox({ list }) {
  return (
    <>
      <motion.div className={styles.title} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>{list.title}</div>
        <OrderCategoryAlert title={list.title} />
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
