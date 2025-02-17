import styles from '@/style/modal/ModalFormState.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';
import Loader from '../Loader';
import MenuModal from './menu/MenuModal';

import { lazy, Suspense } from 'react';

const LazyTableModal = lazy(() => import('./table/TableModal'));

export default function ModalFormState() {
  const tab = useBoundStore((state) => state.tab.title);

  // 탭 별 모달 출력 지정
  switch (tab) {
    case 'menu': {
      return <MenuModal />;
    }
    case 'table': {
      return (
        <div className={styles.formSize}>
          <Suspense fallback={<Loader />}>
            <LazyTableModal />
          </Suspense>
        </div>
      );
    }
  }
}
