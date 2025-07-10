
import TableRequestAlert from '@/features/alert/request';
import KonvaSection from './components/konva';
import { useTableTab } from './hooks/use-table-tab';

export default function TableTabView() {
  const { enableMount } = useTableTab();

  return (
    <>
      {enableMount ? (
        <>
          <KonvaSection />
          <TableRequestAlert />
          {/* TODO: MainModal 구현 */}
          {/* <MainModal /> */}
        </>
      ) : (
        '화면을 돌려주세요'
      )}
    </>
  );
}
