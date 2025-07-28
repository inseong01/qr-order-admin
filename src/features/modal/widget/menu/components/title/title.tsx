import { ReactNode } from 'react';

import styles from './index.module.css';

export default function TitleBox({ children }: { children: ReactNode }) {
  return (
    <div className={styles.title}>
      <span>{children}</span>
    </div>
  );
}
