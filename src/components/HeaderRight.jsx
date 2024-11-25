import styles from '@/style/HeaderRight.module.css';

export default function HeaderRight() {
  return (
    <ul className={styles.right}>
      <li>
        <div>24.11.22. 오후 17:38</div>
      </li>
      <li>
        <div className={styles.serverStatus}>
          <div className={styles}>접속 상태</div>
          <div className={styles.status}></div>
        </div>
      </li>
    </ul>
  );
}
