import styles from './spinner-index.module.css';

export default function LoadingSpinner() {
  return (
    <li className={styles.loaderBox}>
      <div className={styles.loader}></div>
    </li>
  );
}
