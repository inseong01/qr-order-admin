import { AnimatePresence, motion } from 'motion/react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import { AllOrderList, ConfirmModalTitle, MenuCategoryList } from '../../../types/common';

import styles from './confirm-modal.module.css';

export default function ConfirmModal({ title }: { title: ConfirmModalTitle }) {
  // const tab = useBoundStore((state) => state.tab.title);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const selectedList = useBoundStore((state) => state.itemBox.list);
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitError = useBoundStore((state) => state.submit.isError);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const fetchOrderListStatus = useBoundStore((state) => state.fetchOrderListStatus);
  const fetchFormCategoryItem = useBoundStore((state) => state.fetchFormCategoryItem);

  const selectedCategoreis = selectedList as MenuCategoryList[];
  const context = submitMsgType === 'delete' ? '삭제' : title === '주문' ? '완료' : '수정';
  const subTitlte = selectedCategoreis.map((list) => list.title).join(', ');
  // const subTitlte = tab === 'menu' ? selectedCategoreis.map((list) => list.title).join(', ') : '';

  // 카테고리 삭제/주문 상태 처리
  function changeModalStatus(state: 'yes' | 'no') {
    return () => {
      switch (state) {
        case 'no': {
          changeModalState({ isOpen: false });
          return;
        }
        case 'yes': {
          if (submitError) return; // 오류 시 제출 제한
          if (isSubmit) return; // 반복 제출 방지

          const method = submitMsgType === 'delete' ? 'delete' : 'update';

          switch (title) {
            case '주문': {
              const data = selectedList as AllOrderList;
              fetchOrderListStatus({ method, data });
              break;
            }
            case '카테고리': {
              const itemInfo = selectedList as MenuCategoryList;
              fetchFormCategoryItem({ method, itemInfo, table: 'category-menu' });
              break;
            }
          }

          // 모달 닫기
          changeModalState({ isOpen: false });
          return;
        }
      }
    };
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* 모달창 */}
          <motion.dialog
            open={isModalOpen}
            className={styles.dialog}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            {/* 제목 */}
            <div className={styles.title}>
              {title}을 {context}하시겠습니까?
              {subTitlte && (
                <div className={styles.subTitlteBox}>
                  <span className={`${styles.caption} ${styles.subTitlte}`} title={subTitlte}>
                    &#91; {subTitlte} &#93;
                  </span>
                  <span className={styles.caption}>
                    카테고리와 관련된 메뉴들도 <span className={styles.caution}>일괄 삭제</span>됩니다
                  </span>
                </div>
              )}
            </div>

            {/* 버튼 */}
            <ul className={styles.btnBox}>
              <li className={styles.btn} onClick={changeModalStatus('no')}>
                아니요
              </li>
              <li className={styles.btn} onClick={changeModalStatus('yes')}>
                예
              </li>
            </ul>
          </motion.dialog>

          {/* 배경 */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          {/* {tab !== 'menu' && (
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          )} */}
        </>
      )}
    </AnimatePresence>
  );
}
