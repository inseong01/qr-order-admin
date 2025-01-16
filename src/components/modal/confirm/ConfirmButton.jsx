import styles from '@/style/modal/ConfirmModal.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';

export default function ConfirmButton({ title }) {
  // store
  const selectedList = useBoundStore((state) => state.itemBox.list);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const fetchOrderListStatus = useBoundStore((state) => state.fetchOrderListStatus);
  const fetchFormCategoryItem = useBoundStore((state) => state.fetchFormCategoryItem);

  // 카테고리 삭제, 주문 상태 완료 처리
  function onClickChangeModalStatus(state) {
    return () => {
      switch (state) {
        case 'no': {
          changeModalState({ isOpen: false });
          return;
        }
        case 'yes': {
          // 반복 제출 방지
          if (isSubmit) return;
          const method = submitMsgType === 'delete' ? 'delete' : 'update';
          if (title === '주문') {
            fetchOrderListStatus({ method, data: selectedList });
          } else if (title === '카테고리') {
            fetchFormCategoryItem({ method, itemInfo: selectedList, table: 'category-menu' });
          }
        }
      }
    };
  }

  return (
    <ul className={styles.btnBox}>
      <li className={styles.btn} onClick={onClickChangeModalStatus('no')}>
        아니요
      </li>
      <li className={styles.btn} onClick={onClickChangeModalStatus('yes')}>
        예
      </li>
    </ul>
  );
}
