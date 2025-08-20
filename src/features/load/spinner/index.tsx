import styles from './index.module.css';

export default function LoadingSpinner() {
  return (
    <li className={styles.loaderBox} aria-busy={true}>
      <div className={styles.loader}></div>
    </li>
  );
}
