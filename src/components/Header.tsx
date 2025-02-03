import styles from '@/style/Header.module.css';
import HeaderLeft from './top/HeaderLeft';
import HeaderRight from './top/HeaderRight';

export default function Header() {
  return (
    <header className={styles.header}>
      <HeaderLeft />
      <HeaderRight />
    </header>
  );
}
