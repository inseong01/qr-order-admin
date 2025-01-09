import styles from '@/style/Main.module.css';
import MainPageList from './middle/MainPageList';
import Widget from './Widget';

import { lazy, Suspense } from 'react';

const LazyAlertMsg = lazy(() => import('./AlertMsg'));

export default function Main() {
  return (
    <main className={styles.main}>
      <MainPageList />
      <Suspense>
        <LazyAlertMsg />
      </Suspense>
      <Widget />
    </main>
  );
}
