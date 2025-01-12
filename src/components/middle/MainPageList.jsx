import MainPageMenuTab from './MainPageMenuTab';
import { changeModalState } from '../../lib/features/modalState/modalSlice';
import { changeSubmitState } from '../../lib/features/submitState/submitSlice';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';

const LazyMainPageTableTab = lazy(() => import('./MainPageTableTab'));
const LazyMainPageOrderTab = lazy(() => import('./MainPageOrderTab'));

export default function MainPageList() {
  // useSelector
  // const tab = useSelector((state) => state.tabState.title);
  const submitStatus = useSelector((state) => state.submitState.status);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // dispatch
  const dispatch = useDispatch();
  // store
  const tab = useBoundStore((state) => state.tab.title);

  // 제출 완료 시 모달 닫음
  useEffect(() => {
    if (isSubmit && submitStatus === 'fulfilled') {
      dispatch(changeModalState({ isOpen: false }));
      dispatch(changeSubmitState({ isSubmit: false }));
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
