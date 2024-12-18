import styles from '@/style/modal/table/OrderListBox.module.css';

import { motion } from 'motion/react';

export default function OrderListBox({ listData }) {
  const totalPriceToString = listData
    .reduce((prev, curr) => prev + curr.price * curr.amount, 0)
    .toLocaleString();

  return (
    <motion.div
      key={'orderListBox1'}
      className={styles.listBoxWrap}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className={styles.listBox}>
        {listData.length > 0 ? (
          listData.map((menu, idx) => {
            const { name, amount, price } = menu;
            const priceToString = price.toLocaleString();
            return (
              <li key={idx} className={styles.list}>
                <div className={styles.menuBox}>
                  <div className={styles.name}>{name}</div>
                </div>
                <div className={styles.priceBox}>
                  <div className={styles.amount}>{amount}</div>x
                  <div className={styles.price}>{priceToString}원</div>
                </div>
              </li>
            );
          })
        ) : (
          <li className={styles.msg}>
            <span>주문 내역이 없습니다.</span>
          </li>
        )}
      </ul>
      <div className={styles.line}></div>
      <div className={styles.totalPrice}>
        <div className={styles.name}>결제금액</div>
        <div className={styles.price}>{totalPriceToString}원</div>
      </div>
      <div className={styles.submitBtn}>
        <input type="submit" className={styles.btn} value={'결제하기'} name={'pay'} />
      </div>
    </motion.div>
  );
}
