import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/window-atom';
import ErrorComponent from '@/features/page/error';
import TableRequestAlert from '@/features/alert/request';
import { ExceptionText } from '@/components/ui/exception';

import { DataComponentProps, DataWrapperProps } from './types';
import KonvaSection from './components/konva';
import { useTableTab } from './hooks/use-table-tab';
import { ListUlBox } from '../components/list-box';

export default function TableTabView() {
  const { tables, isLoading, isEmpty, isError } = useTableTab();
  const { mainSection } = useAtomValue(windowStateAtom);

  if (isLoading) return <ExceptionText text={'좌석 배치하는 중..'} />;

  return (
    <ListUlBox isDataEmpty={isEmpty} sectionWidth={mainSection.width} tab='menu'>
      <DataWrapper data={{ tables, isEmpty }} error={isError} />
    </ListUlBox>
  );
}

function DataWrapper({ data, error }: DataWrapperProps) {
  if (error) {
    return <ErrorComponent />;
  }

  if (data.isEmpty === true) {
    return <ExceptionText text={'위젯에서 테이블을 생성해주세요.'} />;
  }

  return <DataComponent data={data} />;
}

function DataComponent({ data }: DataComponentProps) {
  return (
    <li>
      {/* 좌석 현황 */}
      <KonvaSection tables={data.tables} />

      {/* 좌석 요청목록 */}
      <TableRequestAlert />
    </li>
  );
}
