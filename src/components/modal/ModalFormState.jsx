import MenuModal from './MenuModal';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

const LazyTableModal = lazy(() => import('./TableModal'));

export default function ModalFormState() {
  // const tab = useSelector((state) => state.tabState.title);
  const tab = useBoundStore((state) => state.tab.title);

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
