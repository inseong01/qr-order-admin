import styles from '@/style/Main.module.css';
import MainPageList from './MainPageList';

export default function Main() {
  return (
    <main className={styles.main}>
      <MainPageList />
    </main>
  );
}
