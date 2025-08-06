import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/window-atom';
import { useQueryTableList } from '@/hooks/use-query/query';
import TableRequestAlert from '@/features/alert/request';
import LoadingSpinner from '@/features/load/spinner';
import { ExceptionText } from '@/components/ui/exception';

import { ListUlBox } from '../components/list-box';
import KonvaSection from './components/konva';
import { draftTablesAtom } from './store/table-edit-state';

export default function TableTabView() {
  const tablesQuery = useQueryTableList();
  const { mainSection } = useAtomValue(windowStateAtom);
  const draftTables = useAtomValue(draftTablesAtom);

  if (tablesQuery.isLoading) return <LoadingSpinner />;

  const hasQueryData = Array.isArray(tablesQuery.data) && tablesQuery.data.length;
  // 데이터가 없거나 추가 중인 테이블 목록도 없을 때 빈 상태로 처리
  const isEmpty = !hasQueryData && !draftTables.length;

  return (
    <ListUlBox isDataEmpty={isEmpty} sectionWidth={mainSection.width} tab='menu'>
      {isEmpty ? (
        <ExceptionText text='위젯에서 테이블을 생성해주세요.' />
      ) : (
        <>
          {/* 좌석 현황 */}
          <KonvaSection />

          {/* 좌석 요청목록 */}
          <TableRequestAlert />
        </>
      )}
    </ListUlBox>
  );
}
