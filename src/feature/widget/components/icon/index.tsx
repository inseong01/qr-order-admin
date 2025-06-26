import { ReactNode } from 'react';

import styles from './icon.module.css';

export default function IconWrap({ children }: { children: ReactNode }) {
  return <div className={styles.icon}>{children}</div>;
}
