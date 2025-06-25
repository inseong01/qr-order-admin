import styles from './spinner-index.module.css';

export default function LoadingSpinner() {
  console.log('loading');
  return (
    <li className={styles.loaderBox}>
      <div className={styles.loader}></div>
    </li>
  );
}
