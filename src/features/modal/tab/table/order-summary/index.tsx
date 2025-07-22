import { motion } from 'motion/react';

import { OrderItem } from '@/lib/supabase/tables/order-item';

import styles from './index.module.css';

export default function OrderSummary({ orders }: { orders: OrderItem[] }) {
  const totalPrice = orders.reduce((prev, curr) => prev + curr.menu.price * curr.quantity, 0).toLocaleString();

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
              return <OrderComponent key={idx} order={order} />;
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
        <button type='submit' className={styles.submit} style={{ backgroundColor: '#4caff8' }}>
          결제하기
        </button>
      </div>
    </motion.div>
  );
}

function OrderComponent({ order }: { order: OrderItem }) {
  const { menu, quantity } = order;
  const price = (menu.price * quantity).toLocaleString();

  return (
    <li className={styles.list}>
      {/* 이름 */}
      <div className={styles.menuBox}>
        <div className={styles.name}>{menu.name}</div>
      </div>

      {/* 가격 */}
      <div className={styles.priceBox}>
        <div className={styles.amount}>{quantity}</div>x<div className={styles.price}>{price}원</div>
      </div>
    </li>
  );
}
