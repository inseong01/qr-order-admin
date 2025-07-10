import { motion } from 'motion/react';

import styles from './index.module.css';
import { Menu } from '@/lib/supabase/function/menu';
import { OrderItem } from '@/lib/supabase/function/order-item';

export default function OrderSummary({ listData }: { listData: OrderItem[] }) {
  // 해당 테이블의 주문만 가져오기
  // 테이블 아이디 -> 주문 아이디 -> 주문 목록 아이디
  // 주문 목록 아이디에서 메뉴 아이디 추출하여 메뉴 목록 배열화

  const totalPrice = listData.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
  const priceToString = totalPrice.toLocaleString();

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
          {listData.length > 0 ? (
            listData.map((menu, idx) => {
              return <OrderComponent key={idx} menu={menu} />;
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
            <div className={styles.name}>결제금액</div>
            <div className={styles.price}>{priceToString}원</div>
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

function OrderComponent({ menu }: { menu: Menu }) {
  const { name, amount, price } = menu;
  const priceToString = price.toLocaleString();

  return (
    <li className={styles.list}>
      {/* 이름 */}
      <div className={styles.menuBox}>
        <div className={styles.name}>{name}</div>
      </div>

      {/* 가격 */}
      <div className={styles.priceBox}>
        <div className={styles.amount}>{amount}</div>x<div className={styles.price}>{priceToString}원</div>
      </div>
    </li>
  );
}
