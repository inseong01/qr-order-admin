import { useAtomValue } from 'jotai';

import { tabModalAtom } from './store/atom';
import TableInfoPannel from './table';
import MenuModal from './menu';

/**
 * `tabModalAtom`의 현재 상태를 기반으로
 * 활성화되어야 할 모달 컴포넌트를 렌더링합니다.
 *
 * @returns 현재 활성화된 모달 컴포넌트 또는 `null`
 */
export default function TabModalContainer() {
  const currentModal = useAtomValue(tabModalAtom);

  // 활성화된 모달이 없으면 아무것도 렌더링하지 않습니다.
  if (!currentModal) {
    return null;
  }

  // 모달 타입이 'menu'로 시작하는 경우
  if (currentModal.startsWith('menu')) {
    return <MenuModal />;
  }

  // 모달 타입이 'table-info'인 경우
  if (currentModal === 'table-info') {
    return <TableInfoPannel />;
  }

  // 해당하는 모달이 없는 경우
  return null;
}
