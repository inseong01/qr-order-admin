import { FetchMethod } from '../../lib/store/slices/fetch-slice';
import { OptionNumList } from '../../lib/store/slices/widget-slice';
import { useBoundStore } from '../../lib/store/use-bound-store';
import { TableDataArr } from '../../lib/supabase/function/fetch-table';

export default function useEditorClickHandler() {
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitError = useBoundStore((state) => state.submit.isError);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const editTableType = useBoundStore((state) => state.konva.type);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetKonvaState = useBoundStore((state) => state.resetKonvaState);
  const setWidgetOptionListState = useBoundStore((state) => state.setWidgetOptionListState);
  const fetchTableListData = useBoundStore((state) => state.fetchTableListData);

  function clickEditor(optNum: OptionNumList, dataArr?: TableDataArr<FetchMethod>) {
    return () => {
      if (isModalOpen || submitError) return;
      if (editTableisEditing) {
        if (isSubmit) return; // 좌석 수정 중 다른 옵션 실행(선택) 방지
        if (optNum !== 1) {
          alert('수정 중에 다른 옵션을 실행할 수 없습니다');
          return;
        }

        const data = dataArr as TableDataArr<FetchMethod>;
        fetchTableListData({ method: editTableType, dataArr: data }); // 편집 저장, db 전송
        resetItemState();
        resetKonvaState();
        return;
      }

      // 위젯 옵션 여닫기
      setWidgetOptionListState({ optNum });
    };
  }

  return { clickEditor };
}
