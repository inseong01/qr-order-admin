import styles from '@/style/middle/menu/MenuList.module.css';
import { list_motion } from '../../../lib/motion/motion_mainPageMenuTab';
import { ModalType } from '../../../lib/store/useModalSlice';
import { MenuList } from '../../../types/common';

import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddMenu({
  onClickOpenModal,
}: {
  onClickOpenModal: (modalType: ModalType, list?: MenuList) => () => void;
}) {
  const isMobileSize = window.innerWidth <= 720;
  return (
    <motion.li
      className={`${styles.list} ${styles.addBtn}`}
      onClick={onClickOpenModal('insert')}
      variants={list_motion}
    >
      <div className={styles.iconBox}>
        <FontAwesomeIcon icon={faPlus} size={isMobileSize ? 'sm' : '1x'} />
      </div>
      <div className="title">상품 추가</div>
    </motion.li>
  );
}
