import { useAtomValue, useSetAtom } from 'jotai';

import { FetchMethod } from '../../../lib/store/slices/fetch-slice'; // TODO: 타입 경로 확인 및 수정 필요
import { TableDataArr } from '../../../lib/supabase/function/fetch-table'; // TODO: 타입 경로 확인 및 수정 필요

import { Options } from '../../features/widget/const/types';

import { widgetAtom } from '../../store/atom/widget-atom';
import { konvaAtomWithReset } from '../../store/atom/konva-atom';

/**
 * 위젯 에디터의 클릭 이벤트를 처리하는 커스텀 훅
 */
export default function useEditorClickHandler() {
  const widget = useAtomValue(widgetAtom);
  const resetKonvaState = useSetAtom(konvaAtomWithReset);

  // Zustand의 useBoundStore를 Jotai로 마이그레이션하는 것을 가정합니다.
  const isSubmit = useAtomValue(isSubmitAtom);
  const submitError = useAtomValue(submitErrorAtom);
  const isModalOpen = useAtomValue(isModalOpenAtom);
  const editTableType = useAtomValue(editTableTypeAtom);
  const editTableIsEditing = useAtomValue(editTableIsEditingAtom);
  const resetItemState = useSetAtom(resetItemStateAtom);
  const setWidgetOptionListState = useSetAtom(setWidgetOptionListStateAtom);
  const fetchTableListData = useSetAtom(fetchTableListDataAtom);

  /**
   * 에디터 옵션 클릭 핸들러
   * @param optNum 클릭된 옵션 번호
   * @param dataArr 테이블 데이터 배열 (옵션 1 선택 시 필요)
   * @returns 클릭 이벤트 핸들러 함수
   */
  function clickEditor(option: Options, dataArr?: TableDataArr<FetchMethod>) {
    return () => {
      // 모달이 열려있거나 제출 오류가 있는 경우, 아무 작업도 수행하지 않음
      if (isModalOpen || submitError) return;

      // 테이블 수정 모드일 경우
      if (editTableIsEditing) {
        if (isSubmit) return;
        if (option !== widget.option) {
          alert('수정 중에 다른 옵션을 실행할 수 없습니다');
          return;
        }

        // 테이블 데이터 편집 저장 (DB 전송)
        const data = dataArr as TableDataArr<FetchMethod>;
        fetchTableListData({ method: editTableType, dataArr: data });

        // 관련 상태 초기화
        resetItemState();
        resetKonvaState();
        return;
      }

      // 위젯 옵션 목록을 열거나 닫음
      setWidgetOptionListState({ option: '' });
    };
  }

  return { clickEditor };
}
