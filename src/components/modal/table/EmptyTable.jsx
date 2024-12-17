import styles from '@/style/modal/table/EmptyTable.module.css';

export default function EmptyTable() {
  return (
    <p className={styles.msg}>
      <span className={styles.status}>주문 내역이 없습니다.</span>
    </p>
  );
}
