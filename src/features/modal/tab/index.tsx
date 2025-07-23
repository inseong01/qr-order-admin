import { useAtomValue } from 'jotai';

import { tabModalAtom } from './store/atom';
import TableInfoPannel from './table';
import MenuModal from './menu';

/**
 * `tabModalAtom`의 현재 상태를 기반으로
 * 활성화되어야 할 모달 컴포넌트를 렌더링합니다.
 *
 * @returns 현재 활성화된 모달 컴포넌트
 */
export default function TabModalContainer() {
  const currentModal = useAtomValue(tabModalAtom);

  const modals = {
    'menu-create': MenuModal,
    'menu-update': MenuModal,
    'table-info': TableInfoPannel,
  };
  const ModalComponent = modals[currentModal];

  return <ModalComponent />;
}
