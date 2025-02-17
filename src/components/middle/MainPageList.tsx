import { useBoundStore } from '../../lib/store/useBoundStore';
import Loader from '../Loader';
import MainPageMenuTab from './MainPageMenuTab';

import { lazy, Suspense, useEffect } from 'react';

const LazyMainPageTableTab = lazy(() => import('./MainPageTableTab'));
const LazyMainPageOrderTab = lazy(() => import('./MainPageOrderTab'));

export default function MainPageList() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const changeModalState = useBoundStore((state) => state.changeModalState);

  // 제출 완료 시 모달 닫음
  useEffect(() => {
    if (!isSubmit && submitStatus === 'fulfilled') {
      changeModalState({ isOpen: false });
    }
  }, [isSubmit, submitStatus]);

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
