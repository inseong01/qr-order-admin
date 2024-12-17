import styles from '@/style/modal/table/NotEmptyTable.module.css';
import OrderListBox from '../OrderListBox';

export default function NotEmptyTable({ billArr, tableName }) {
  const totalPriceToString = billArr
    .reduce((prev, curr) => prev + curr.price * curr.amount, 0)
    .toLocaleString();

  return (
    <>
      <h3 className={styles.table}>{tableName}</h3>
      <OrderListBox listData={billArr} />
      <div className={styles.line}></div>
      <div className={styles.totalPrice}>
        <div className={styles.name}>결제금액</div>
        <div className={styles.price}>{totalPriceToString}원</div>
      </div>
      <div className={styles.submitBtn}>
        <input type="submit" className={styles.btn} value={'결제하기'} name={'pay'} />
      </div>
    </>
  );
}
