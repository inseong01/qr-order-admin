import { useBoundStore } from '../../../lib/store/use-bound-store';

import MainModal from '../../modal/modal-index';
import TableAlertMsg from '../../alert/table/alert-index';
import KonvaSection from './konva/konva-index';

export default function MainPageTableTab() {
  const isMobile = useBoundStore((state) => state.windowState.isMobile);
  const viewportMode = useBoundStore((state) => state.windowState.viewportMode);

  const enableMount = !isMobile || viewportMode === 'landscape';

  return (
    <>
      {enableMount ? (
        <>
          {/* 좌석 탭 */}
          <KonvaSection />

          {/* 모달 */}
          <MainModal />

          {/* 테이블 알림 */}
          <TableAlertMsg />
        </>
      ) : (
        '화면을 돌려주세요'
      )}
    </>
  );
}
