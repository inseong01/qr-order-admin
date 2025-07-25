import styles from './index.module.css';

export default function ErrorComponent() {
  return (
    <main className={styles.main}>
      <span>오류가 발생했습니다.</span>
    </main>
  );
}
