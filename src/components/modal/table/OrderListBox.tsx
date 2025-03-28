import styles from '@/style/modal/table/OrderListBox.module.css';
import { AllMenuObj } from '../../../lib/function/createReceipt';

import { motion } from 'motion/react';

function OrderComponent({ menu }: { menu: AllMenuObj }) {
  const { name, amount, price } = menu;
  const priceToString = price.toLocaleString();

  return (
    <li className={styles.list}>
      <div className={styles.menuBox}>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.priceBox}>
        <div className={styles.amount}>{amount}</div>x
        <div className={styles.price}>{priceToString}원</div>
      </div>
    </li>
  );
}

export default function OrderListBox({ listData }: { listData: AllMenuObj[] }) {
  const totalPrice = listData.reduce((prev, curr) => {
    return prev + curr.price * curr.amount;
  }, 0);
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
      <div className={styles.line}></div>
      <div className={styles.totalPrice}>
        <div className={styles.name}>결제금액</div>
        <div className={styles.price}>{priceToString}원</div>
      </div>
      <div className={styles.submitBtn}>
        <input type="submit" className={styles.btn} value={'결제하기'} name={'update'} />
      </div>
    </motion.div>
  );
}
