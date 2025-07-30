import TableRequestAlert from '@/features/alert/request';

import KonvaSection from './components/konva';

export default function TableTabView() {
  return (
    <>
      {/* 좌석 현황 */}
      <KonvaSection />

      {/* 좌석 요청목록 */}
      <TableRequestAlert />
    </>
  );
}
