import styles from './header-index.module.css';

import HeaderLeft from './header-left';
import HeaderRight from '../../timer';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* 좌측 */}
      <HeaderLeft />

      {/* 우측 */}
      <HeaderRight />
    </header>
  );
}
