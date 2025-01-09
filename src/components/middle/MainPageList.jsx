import MainPageMenuTab from './MainPageMenuTab';

import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';

const LazyMainPageTableTab = lazy(() => import('./MainPageTableTab'));
const LazyMainPageOrderTab = lazy(() => import('./MainPageOrderTab'));

export default function MainPageList() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);

  switch (tab) {
    case 'menu': {
      return <MainPageMenuTab />;
    }
    case 'table': {
      return (
        <Suspense>
          <LazyMainPageTableTab />
        </Suspense>
      );
    }
    case 'order': {
      return (
        <Suspense>
          <LazyMainPageOrderTab />
        </Suspense>
      );
    }
  }
}
