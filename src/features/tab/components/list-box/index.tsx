import { ReactNode } from 'react';
import { motion } from 'motion/react';

import styles from './index.module.css';

type ListBoxProps = {
  children: ReactNode;
  isDataEmpty: boolean;
  sectionWidth: number;
  tab: 'menu' | 'table' | 'order';
};

export function ListUlBox({ children, isDataEmpty, sectionWidth, tab }: ListBoxProps) {
  let computedWidth;

  if (isDataEmpty) {
    // 각 탭에서 data 없는 경우,
    // 오류 문구 중앙 배치 목적
    computedWidth = sectionWidth;
  } else if (tab === 'order') {
    // 주문 탭 100% 적용하는 경우,
    // 카드 수에 비례해 레이아웃 간격 일정하지 않아 width: 'auto' 부여
    computedWidth = 'auto';
  } else {
    computedWidth = sectionWidth;
  }

  return (
    <motion.ul
      className={styles.box}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-empty={isDataEmpty}
      data-tab={tab}
      style={{ width: computedWidth }}
    >
      {children}
    </motion.ul>
  );
}
