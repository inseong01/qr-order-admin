import { ReactNode } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';

import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { completeOrder, deleteOrder, Order } from '@/lib/supabase/tables/order';
import { windowStateAtom } from '@/store/atom/window-atom';
import validate from '@/utils/function/validate';

import OrderCardTablet from './variants/order-card-tablet';
import OrderCardMobile from './variants/order-card-mobile';
import { clickStateAtom, setClickStateAtom } from './store/atom';
import styles from './order-card.module.css';

export default function OrderCard({ order }: { order: Order }) {
  const { isMobile } = useAtomValue(windowStateAtom);
  const isClicked = useAtomValue(clickStateAtom);
  const setClickState = useSetAtom(setClickStateAtom);

  function clickTopBox() {
    setClickState();
  }

  return (
    <OrderCardContainer orderId={order.id}>
      <div className={styles.topBox} onClick={clickTopBox} data-is-completed={order.is_done}>
        <div className={styles.top}>
          <div className={styles.title}>#{order.order_number}</div>
          <div className={styles.right}>
            <div className={styles.table}>테이블 {order.table.number}</div>
          </div>
        </div>
      </div>

      {isMobile ? <OrderCardMobile order={order} isClicked={isClicked} /> : <OrderCardTablet order={order} />}
    </OrderCardContainer>
  );
}

interface OrderCardContainerProps {
  orderId: string;
  children: ReactNode;
}

function OrderCardContainer({ children, orderId }: OrderCardContainerProps) {
  const x = useMotionValue(0);
  const background = useTransform(x, [-100, 100], ['#ef4444', '#22c55e']);
  const deleteOpacity = useTransform(x, [-100, -50], [1, 0]);
  const completeOpacity = useTransform(x, [50, 100], [0, 1]);
  const { isMobile } = useAtomValue(windowStateAtom);
  const { showConfirmModal } = useConfirmModal();
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);

  /* 비즈니스 로직 */
  const handleDragEnd = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    const dragThreshold = 150;
    const isNegative = Math.sign(info.offset.x) === -1 ? true : false;
    const offsetX = Math.abs(Math.floor(info.offset.x));
    let title = '주문을 삭제하겠습니까?';
    let onConfirm = async () => {};

    /* 일정 드래그 이하 상태 반환 */
    if (offsetX <= dragThreshold) {
      animate(x, 0, { type: 'tween', stiffness: 100, damping: 50 });
      return;
    }

    /* 데이터 처리 구분 */
    if (!isNegative) {
      title = '주문을 완료하겠습니까?';
      onConfirm = async () => {
        const { success, error } = await validate.orderIdValue(orderId); // 값 검증

        if (!success) {
          const message = error?.issues[0].message;
          alert(message);
          return;
        }

        try {
          await completeOrder(orderId); // supabase 전달
          openSubmissionStatusAlert('완료되었습니다'); // 데이터 처리 상태 알림
        } catch (e) {
          console.error(e);
          openSubmissionStatusAlert('오류가 발생했습니다.'); // 데이터 처리 상태 알림
        }
      };
    } else {
      title = '주문을 삭제하겠습니까?';
      onConfirm = async () => {
        const { success, error } = await validate.orderIdValue(orderId); // 값 검증

        if (!success) {
          const message = error?.issues[0].message;
          alert(message);
          return;
        }

        try {
          await deleteOrder(orderId); // supabase 전달
          openSubmissionStatusAlert('삭제되었습니다.'); // 데이터 처리 상태 알림
        } catch (e) {
          console.error(e);
          openSubmissionStatusAlert('오류가 발생했습니다.'); // 데이터 처리 상태 알림
        }
      };
    }

    showConfirmModal({ title, onConfirm });
    animate(x, 0, { type: 'tween', stiffness: 100, damping: 50 });
  };

  return (
    <motion.div layout className={styles.container}>
      {/* 주문 */}
      <motion.li className={styles.slide} drag={isMobile ? 'x' : false} style={{ x }} onDragEnd={handleDragEnd}>
        {children}
      </motion.li>

      {/* 배경 */}
      <motion.div className={styles.bg} style={{ background, opacity: 1 }}>
        <motion.div className={styles.actionText} style={{ opacity: completeOpacity }}>
          주문 완료
        </motion.div>

        <motion.div className={styles.actionText} style={{ opacity: deleteOpacity }}>
          주문 삭제
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
