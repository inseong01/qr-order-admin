import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ModalType } from '../../../lib/store/slices/modal-slice';

import { MenuList } from '../../../types/common';

import styles from './menu-item.module.css';

import { listMotion } from './motion/variants';

export function InsertMenuItem({
  onClickOpenModal,
}: {
  onClickOpenModal: (modalType: ModalType, list?: MenuList) => () => void;
}) {
  const isMobileSize = window.innerWidth <= 720;
  return (
    <motion.li className={`${styles.list} ${styles.addBtn}`} onClick={onClickOpenModal('insert')} variants={listMotion}>
      {/* 아이콘 */}
      <div className={styles.iconBox}>
        <FontAwesomeIcon icon={faPlus} size={isMobileSize ? 'sm' : '1x'} />
      </div>

      {/* 제목 */}
      <div className='title'>상품 추가</div>
    </motion.li>
  );
}

export function MenuListItem({
  onClickOpenModal,
  list,
}: {
  onClickOpenModal: (modalType: ModalType, list: MenuList) => () => void;
  list: MenuList;
}) {
  const { name, price } = list;
  const menuPrice = price.toLocaleString();

  return (
    <motion.li
      className={styles.list}
      onClick={onClickOpenModal('update', list)}
      variants={listMotion}
      exit={{ opacity: 0 }}
    >
      {/* 상품명 */}
      <div className={styles.topBox}>
        <div className={styles.top}>
          <div className={styles.title}>{name}</div>
        </div>
      </div>

      {/* 가격 */}
      <div className={styles.bottomBox}>
        <div className={styles.bottom}>
          <div className={styles.price}>{menuPrice}원</div>
        </div>
      </div>
    </motion.li>
  );
}
