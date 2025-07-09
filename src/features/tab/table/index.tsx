import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/atom/window-atom';
import { idAtom } from '@/store/atom/id-atom';
import TableRequestAlert from '@/features/alert/request';
import TableInfoPannel from '@/features/modal/table';
// import MainModal from '@/features/modal';

import KonvaSection from './konva';

export default function MainPageTableTab() {
  const { isMobile, viewportMode } = useAtomValue(windowStateAtom);
  const id = useAtomValue(idAtom);

  const enableMount = !isMobile || viewportMode === 'landscape';

  return (
    <>
      {enableMount ? (
        <>
          {/* 좌석 탭 */}
          <KonvaSection />

          {/* 모달 */}
          {/* <MainModal /> */}

          {/* 테이블 알림 */}
          <TableRequestAlert />
        </>
      ) : (
        '화면을 돌려주세요'
      )}
    </>
  );
}
