import { useSetAtom } from 'jotai';
import { motion } from 'motion/react';

import { OrderItem } from '@/lib/supabase/tables/order-item';

import { setModalClickAtom } from '../../store/atom';
import ListComponent from './list';
import styles from './index.module.css';

export default function OrderSummary({ orders }: { orders: OrderItem[] }) {
  const setModalClick = useSetAtom(setModalClickAtom);
  const totalPrice = orders.reduce((prev, curr) => prev + curr.menu.price * curr.quantity, 0).toLocaleString();

  function handlePayment() {
    alert('준비중입니다.');
    setModalClick(false);
  }

  return (
    <motion.div
      key={'orderListBox1'}
      className={styles.listBoxWrap}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.wrap}>
        {/* 주문내역 */}
        <ul className={styles.listBox}>
          {orders.length > 0 ? (
            orders.map((order, idx) => {
              return <ListComponent key={idx} order={order} />;
            })
          ) : (
            <li className={styles.msg}>
              <span>주문 내역이 없습니다.</span>
            </li>
          )}
        </ul>

        <div>
          {/* 구분선 */}
          <div className={styles.line}></div>

          {/* 총 금액 */}
          <div className={styles.totalPrice}>
            <div className={styles.menu}>결제금액</div>
            <div className={styles.price}>{totalPrice}원</div>
          </div>
        </div>
      </div>

      {/* 결제버튼 */}
      <div className={styles.submitBox}>
        <button type='button' className={styles.submit} style={{ backgroundColor: '#4caff8' }} onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </motion.div>
  );
}
