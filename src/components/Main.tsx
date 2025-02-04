import styles from '@/style/Main.module.css';
import MainPageList from './middle/MainPageList';

import { lazy, Suspense } from 'react';

const LazyAlertMsg = lazy(() => import('./AlertMsg'));
const LazyWidget = lazy(() => import('./Widget'));

export default function Main() {
  return (
    <main className={styles.main}>
      <MainPageList />
      <Suspense>
        <LazyAlertMsg />
      </Suspense>
      <Suspense>
        <LazyWidget />
      </Suspense>
    </main>
  );
}
