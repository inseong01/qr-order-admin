import styles from '@/style/Loader.module.css';

export default function Loader() {
  return (
    <li className={styles.loaderBox}>
      <div className={styles.loader}></div>
    </li>
  );
}
