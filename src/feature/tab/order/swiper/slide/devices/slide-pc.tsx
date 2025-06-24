import { MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../../../types/common';

import styles from './slide-pc.module.css';

import OrderListView from './components/list-view';
import OrderListFooter from './components/list-footer';

export default function OrderListSlideDesktop({ list }: { list: AllOrderList }) {
  const categoryId = useBoundStore((state) => state.category.id);
  const selectedListId = useBoundStore((state) => state.itemBox.selectedListId);
  const getSelectedListId = useBoundStore((state) => state.getSelectedListId);

  const isSelectedList = selectedListId === list.id;

  function onClickCloseListOption(e: MouseEvent<HTMLLIElement>) {
    e.stopPropagation();
    getSelectedListId({ selectedListId: '' });
  }

  return (
    <>
      {/* 주문목록 */}
      <OrderListView orderList={list.orderList} />

      {/* 푸터 */}
      <OrderListFooter list={list} id={categoryId} />

      {/* 옵션 */}
      <AnimatePresence>
        {isSelectedList && (
          <motion.ul
            className={styles.listOptionBox}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ x: '-50%', y: 12, transform: 'translateX(-50%)' }}
          >
            <li className={styles.option} onClick={onClickCloseListOption}>
              <FontAwesomeIcon icon={faCircleXmark} size='xl' />
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
