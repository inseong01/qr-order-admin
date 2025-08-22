import { useSetAtom } from 'jotai';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { completeOrder, deleteOrder, Order } from '@/lib/supabase/tables/order';
import { useQueryAllOrderList } from '@/hooks/use-query/query';
import validate from '@/utils/function/validate';

import styles from './index.module.css';

interface CardButtonProps {
  orderId: Order['id'];
  type: 'delete' | 'complete';
  inavtive: boolean;
}

export default function CardButton({ orderId, type, inavtive = false }: CardButtonProps) {
  const { showConfirmModal } = useConfirmModal();
  const { refetch } = useQueryAllOrderList();
  const showToast = useSetAtom(showToastAtom);

  /* 비즈니스 로직 */
  function onClickUpdateListState() {
    const title = type === 'complete' ? '주문이 완료되었습니까?' : '주문을 삭제하겠습니까?';
    const onConfirm = async () => {
      const { success, error } = await validate.orderIdValue(orderId); // 값 검증
      if (!success) {
        const message = error?.issues[0].message;
        alert(message);
        return;
      }

      try {
        type === 'complete' ? await completeOrder(orderId) : await deleteOrder(orderId); // supabase 전달
        await refetch();
        showToast(type === 'complete' ? '완료되었습니다' : '삭제되었습니다.'); // 데이터 처리 상태 알림
      } catch (e) {
        console.error(e);
        showToast('오류가 발생했습니다.');
      }
    };

    showConfirmModal({ title, onConfirm });
  }

  return (
    <button
      type='button'
      className={`${styles.btn} ${type === 'delete' ? styles.delete : ''}`}
      onClick={onClickUpdateListState}
      disabled={inavtive}
    >
      {type === 'delete' ? '삭제' : '조리 완료'}
    </button>
  );
}
