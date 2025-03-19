import styles from '@/style/modal/ConfirmModal.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { AllOrderList, ConfirmModalTitle, MenuCategoryList } from '../../../types/common';

type State = 'yes' | 'no';

export default function ConfirmButton({ title }: { title: ConfirmModalTitle }) {
  // store
  const selectedList = useBoundStore((state) => state.itemBox.list);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitError = useBoundStore((state) => state.submit.isError);
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const fetchOrderListStatus = useBoundStore((state) => state.fetchOrderListStatus);
  const fetchFormCategoryItem = useBoundStore((state) => state.fetchFormCategoryItem);

  // 카테고리 삭제/주문 상태 완료 처리
  function onClickChangeModalStatus(state: State) {
    return () => {
      switch (state) {
        case 'no': {
          changeModalState({ isOpen: false });
          return;
        }
        case 'yes': {
          const method = submitMsgType === 'delete' ? 'delete' : 'update';

          // 오류 시 제출 제한
          if (submitError) return;

          // 반복 제출 방지
          if (isSubmit) return;

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
