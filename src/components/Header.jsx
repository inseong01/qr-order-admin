import styles from '@/style/Header.module.css';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

export default function Header() {
  return (
    <header className={styles.header}>
      <HeaderLeft />
      <HeaderRight />
    </header>
  );
}
