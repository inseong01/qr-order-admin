import { ReactNode } from 'react';

import styles from './submit-info.module.css';

export function SubmitInfoBox({ children }: { children: ReactNode }) {
  return <ul className={styles.submitInfo}>{children}</ul>;
}
