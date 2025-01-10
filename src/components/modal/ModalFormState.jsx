import MenuModal from './MenuModal';

import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

const LazyTableModal = lazy(() => import('./TableModal'));

export default function ModalFormState() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);

  // 탭 별 모달 출력 지정
  switch (tab) {
    case 'menu': {
      return <MenuModal />;
    }
    case 'table': {
      return (
        <Suspense>
          <LazyTableModal />
        </Suspense>
      );
    }
  }
}
