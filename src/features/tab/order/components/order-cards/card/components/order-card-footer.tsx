import { Order } from '@/lib/supabase/function/order';
import styles from './order-card-footer.module.css';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';

// TODO: Zustand 스토어 마이그레이션 후 아래 주석 해제
// import { useBoundStore } from '@/store';

interface OrderCardFooterProps {
  order: Order;
}

export default function OrderCardFooter({ order }: OrderCardFooterProps) {
  return (
    <div className={styles.bottomBox}>
      <div className={styles.bottom}>
        {/* 삭제 */}
        <OrderCardSubmitButton order={order} type='delete' />

        {/* 완료 */}
        <OrderCardSubmitButton order={order} type='complete' />
      </div>
    </div>
  );
}

interface OrderCardSubmitButtonProps {
  order: Order;
  type: 'delete' | 'complete';
}

function OrderCardSubmitButton({ order, type }: OrderCardSubmitButtonProps) {
  const { showConfirmModal } = useConfirmModal();
  // const submitIsError = useBoundStore((state) => state.submit.isError);
  // const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  // const getListInfo = useBoundStore((state) => state.getListInfo);
  // const changeModalState = useBoundStore((state) => state.changeModalState);
  // const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);

  // 기능: 주문 상태 업데이트 (삭제/완료)
  function onClickUpdateListState(order: Order) {
    return () => {
      // if (isSubmit) return;
      // if (submitIsError) return;
      const title = type === 'complete' ? '주문이 완료되었습니까?' : '주문을 삭제하겠습니까?';
      const onConfirm = () => {
        console.log('order: ', order);
      };
      showConfirmModal({ title, onConfirm });

      // changeSubmitMsgType({ msgType: type });
      // changeModalState({ type: 'update', isOpen: true });
      // getListInfo({ order });
    };
  }

  return (
    <button
      type='button'
      className={`${styles.btn} ${type === 'delete' ? styles.delete : ''}`}
      onClick={onClickUpdateListState(order)}
    >
      {type === 'delete' ? '삭제' : '완료'}
    </button>
  );
}
