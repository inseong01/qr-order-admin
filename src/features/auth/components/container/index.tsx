import { ReactNode } from 'react';

import GuestLink from '../guest-link';
import styles from './index.module.css';

type ConatinerProps = {
  children: ReactNode;
};

export default function AuthContainer({ children }: ConatinerProps) {
  return (
    <div className={styles.container}>
      {/* 폼 컨테이너 */}
      <div className={styles.formBox}>{children}</div>

      {/* 방문자 접속하기 */}
      <GuestLink />
    </div>
  );
}
