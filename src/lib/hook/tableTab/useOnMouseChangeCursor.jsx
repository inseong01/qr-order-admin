import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import fetchTableRequestList from '../../supabase/func/fetchTableRequestList';

export default function useOnMouseChangeCursor(stage, table) {
  // useSelector
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  const konvaEditType = useSelector((state) => state.konvaState.type);
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
  // useQuery
  const requestList = useQuery({
    queryKey: ['requestList', requestTrigger],
    queryFn: () => fetchTableRequestList('select'),
    initialData: [],
  });
  // variant
  const { id } = table;
  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';

  function onMouseLeaveChangePointer() {
    stage.current.container().style.cursor = 'default';
  }

  function onMouseEnterChangePointer() {
    // 좌석 편집 중
    if (isTransformerAble) {
      stage.current.container().style.cursor = 'move';
      return;
    }
    // 좌석 편집 유형 'delete/update'
    if (konvaEditType === 'delete' || konvaEditType === 'update') {
      stage.current.container().style.cursor = 'pointer';
      return;
    }
    // 좌석 편집 중 아니고 데이터 있을 때
    if (konvaEditType === '' && requestList.isFetched) {
      stage.current.container().style.cursor = 'pointer';
      return;
    }
  }

  return { onMouseLeaveChangePointer, onMouseEnterChangePointer };
}
