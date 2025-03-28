import { useBoundStore } from '../../lib/store/useBoundStore';
import TableAlertMsg from '../alertMsg/TableAlertMsg';
import MainModal from '../modal/MainModal';
import KonvaSection from './konva/KonvaSection';

function TableTabComponent() {
  return (
    <>
      <KonvaSection />
      <MainModal />
      <TableAlertMsg />
    </>
  );
}

export default function MainPageTableTab() {
  // store
  const isMobile = useBoundStore((state) => state.windowState.isMobile);
  const viewportMode = useBoundStore((state) => state.windowState.viewportMode);
  // state
  const enableMount = !isMobile || viewportMode === 'landscape';

  return <>{enableMount ? <TableTabComponent /> : '화면을 돌려주세요'}</>;
}
