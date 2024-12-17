import styles from '@/style/modal/OrderListBox.module.css';

export default function OrderListBox({ listData }) {
  return (
    <ul className={styles.listBox}>
      {listData.map((menu, idx) => {
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
      })}
    </ul>
  );
}
