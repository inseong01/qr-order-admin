import TableRequestAlert from '@/features/alert/request';

import KonvaSection from './components/konva';
import { useTableTab } from './hooks/use-table-tab';

export default function TableTabView() {
  const { enableMount } = useTableTab();

  return (
    <>
      {enableMount ? (
        <>
          {/* 좌석 현황 */}
          <KonvaSection />

          {/* 좌석 요청목록 */}
          <TableRequestAlert />
        </>
      ) : (
        '화면을 돌려주세요'
      )}
    </>
  );
}
