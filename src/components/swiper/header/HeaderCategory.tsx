import styles from '@/style/swiper/header/HeaderCategorySwiper.module.css';
import { MenuCategoryList } from '../../../types/common';
import OrderCategoryAlert from '../../top/OrderCategoryAlert';
import HeaderCategoryBox from './HeaderCategoryBox';

import { motion } from 'motion/react';

function TitleBoxComponent({ list }: { list: MenuCategoryList }) {
  return (
    <>
      <motion.div className={styles.title} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>{list.title}</div>
        <OrderCategoryAlert title={list.title} />
      </motion.div>
    </>
  );
}

export default function HeaderCategory({ list }: { list: MenuCategoryList }) {
  return (
    <HeaderCategoryBox list={list}>
      <TitleBoxComponent list={list} />
    </HeaderCategoryBox>
  );
}
