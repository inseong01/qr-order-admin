import { lazy, Suspense } from 'react';
import { useAtomValue } from 'jotai';

import MenuTabView from './menu/view';
import { footerAtom } from '../page/footer';
import LoadingSpinner from '../load/spinner';

const LazyTableTabView = lazy(() => import('./table/view'));
const LazyOrderTabView = lazy(() => import('./order/view'));

/**
 * `footerAtom`의 현재 상태를 기반으로
 * 활성화되어야 할 탭 컴포넌트를 렌더링합니다.
 *
 * @returns 현재 활성화된 탭 컴포넌트
 */
export default function TabViewContainer() {
  const category = useAtomValue(footerAtom);

  const Tabs = {
    menu: MenuTabView,
    table: LazyTableTabView,
    order: LazyOrderTabView,
  };
  const TabComponent = Tabs[category];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TabComponent />
    </Suspense>
  );
}
