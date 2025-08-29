import { useAtomValue } from 'jotai';

import MenuTabView from './menu/view';
import OrderTabView from './order/view';
import TableTabView from './table/view';
import { footerAtom } from '../page/footer';

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
    table: TableTabView,
    order: OrderTabView,
  };
  const TabComponent = Tabs[category];

  return <TabComponent />;
}
