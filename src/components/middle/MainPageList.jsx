import MainPageMenuTab from './MainPageMenuTab';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { lazy, Suspense, useEffect } from 'react';

const LazyMainPageTableTab = lazy(() => import('./MainPageTableTab'));
const LazyMainPageOrderTab = lazy(() => import('./MainPageOrderTab'));

export default function MainPageList() {
  // store
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitStatus = useBoundStore((state) => state.submit.status);
  // store
  const tab = useBoundStore((state) => state.tab.title);
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
