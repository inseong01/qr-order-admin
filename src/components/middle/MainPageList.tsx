import { useBoundStore } from '../../lib/store/useBoundStore';
import Loader from '../Loader';
import MainPageMenuTab from './MainPageMenuTab';

import { lazy, Suspense } from 'react';

const LazyMainPageTableTab = lazy(() => import('./MainPageTableTab'));
const LazyMainPageOrderTab = lazy(() => import('./MainPageOrderTab'));

export default function MainPageList() {
  // store
  const tab = useBoundStore((state) => state.tab.title);

  switch (tab) {
    case 'menu': {
      return <MainPageMenuTab />;
    }
    case 'table': {
      return (
        <Suspense fallback={<Loader />}>
          <LazyMainPageTableTab />
        </Suspense>
      );
    }
    case 'order': {
      return (
        <Suspense fallback={<Loader />}>
          <LazyMainPageOrderTab />
        </Suspense>
      );
    }
  }
}
