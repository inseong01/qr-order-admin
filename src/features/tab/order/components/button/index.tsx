import { useSetAtom } from 'jotai';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';

import { Order } from '@/lib/supabase/tables/order';

import { useMutationCompleteOrder } from '@/hooks/use-query/order/query';

import validate from '@/util/function/menu-validate';

import styles from './index.module.css';

interface CardButtonProps {
  orderId: Order['id'];
  type: 'delete' | 'complete';
  inavtive: boolean;
}

export default function CardButton({ orderId, type, inavtive = false }: CardButtonProps) {
  const showToast = useSetAtom(showToastAtom);

  const { showConfirmModal } = useConfirmModal();
  const mutationCompleteOrder = useMutationCompleteOrder();

  /* 비즈니스 로직 */
  function onClickUpdateListState() {
    const title = type === 'complete' ? '주문이 완료되었습니까?' : '주문을 삭제하겠습니까?';
    const onConfirm = async () => {
      const { success, error } = await validate.orderIdValue(orderId); // 값 검증
      if (!success) {
        const message = error?.issues[0].message;
        showToast(message);
        return;
      }

      if (type === 'complete') {
        mutationCompleteOrder.mutate({ id: orderId });
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
      data-testid={`${type}-${orderId}`}
    >
      {type === 'delete' ? '삭제' : '조리 완료'}
    </button>
  );
}
