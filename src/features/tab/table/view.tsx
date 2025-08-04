import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/atom/window-atom';
import { useQueryTableList } from '@/hooks/use-query/query';
import TableRequestAlert from '@/features/alert/request';
import LoadingSpinner from '@/features/load/spinner';
import { ExceptionText } from '@/components/ui/exception';

import { ListUlBox } from '../components/list-box';
import KonvaSection from './components/konva';

export default function TableTabView() {
  const tablesQuery = useQueryTableList();
  const { mainSection } = useAtomValue(windowStateAtom);

  if (tablesQuery.isLoading) return <LoadingSpinner />;

  const isEmpty = !tablesQuery.data?.length;

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
