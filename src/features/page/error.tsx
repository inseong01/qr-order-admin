import { ExceptionText } from '@/components/ui/exception';

import styles from './index.module.css';

export default function ErrorComponent() {
  return (
    <main className={styles.main}>
      <ExceptionText text='예기치 않은 오류가 발생했습니다.' />
    </main>
  );
}
