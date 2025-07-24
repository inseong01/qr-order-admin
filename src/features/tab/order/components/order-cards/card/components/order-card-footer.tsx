import { useSetAtom } from 'jotai';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { useQueryAllOrderList } from '@/hooks/use-query/query';

import { completeOrder, deleteOrder, Order } from '@/lib/supabase/tables/order';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';

import validate from '@/utils/function/validate';

import styles from './order-card-footer.module.css';

export default function OrderCardFooter({ order }: { order: Order }) {
  const allOrderQuery = useQueryAllOrderList();

  return (
    <div className={styles.bottomBox}>
      <div className={styles.bottom}>
        {/* 삭제 */}
        <OrderCardSubmitButton order={order} type='delete' refetch={allOrderQuery.refetch} />

        {/* 완료 */}
        <OrderCardSubmitButton order={order} type='complete' refetch={allOrderQuery.refetch} />
      </div>
    </div>
  );
}

interface OrderCardSubmitButtonProps {
  order: Order;
  type: 'delete' | 'complete';
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Order[], Error>>;
}

function OrderCardSubmitButton({ order, type, refetch }: OrderCardSubmitButtonProps) {
  const { showConfirmModal } = useConfirmModal();
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);

  /* 비즈니스 로직 */
  function onClickUpdateListState() {
    const title = type === 'complete' ? '주문이 완료되었습니까?' : '주문을 삭제하겠습니까?';
    const onConfirm = async () => {
      const { success, error } = await validate.orderIdValue(order.id); // 값 검증
      if (!success) {
        const message = error?.issues[0].message;
        alert(message);
        return;
      }

      try {
        type === 'complete' ? await completeOrder(order.id) : await deleteOrder(order.id); // supabase 전달
        await refetch();
        openSubmissionStatusAlert(type === 'complete' ? '완료되었습니다' : '삭제되었습니다.'); // 데이터 처리 상태 알림
      } catch (e) {
        console.error(e);
        openSubmissionStatusAlert('오류가 발생했습니다');
      }
    };

    showConfirmModal({ title, onConfirm });
  }

  return (
    <button
      type='button'
      className={`${styles.btn} ${type === 'delete' ? styles.delete : ''}`}
      onClick={onClickUpdateListState}
    >
      {type === 'delete' ? '삭제' : '완료'}
    </button>
  );
}
