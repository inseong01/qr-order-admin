import { onSubmitDataInfo } from '../function/modal/onSubmitDataInfo';
import { useBoundStore } from '../store/useBoundStore';
import { AdminId, FileBody, Method } from '../store/useFetchSlice';

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';

export type SubmitType =
  | 'insert-category'
  | 'update-category'
  | 'upsert-category'
  | 'table'
  | 'menu-insert/update';

export default function useModalSubmitData() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const item = useBoundStore((state) => state.itemBox.item);
  const modalType = useBoundStore((state) => state.modal.type);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetCategoryState = useBoundStore((state) => state.resetCategoryState);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);
  const fetchFormCategoryItem = useBoundStore((state) => state.fetchFormCategoryItem);
  const fetchFormMenuItem = useBoundStore((state) => state.fetchFormMenuItem);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  // useState
  const [value, setValue] = useState(item);

  // input value 업데이트
  useEffect(() => {
    setValue(item);
  }, [item]);

  // 제출 후 상태 초기화
  useEffect(() => {
    if (submitStatus !== 'fulfilled') return;
    // 주문 삭제/완료 처리 되었다면
    if (tab === 'order') {
      resetItemState();
    }
    // 카테고리 수정/삭제 되었다면
    if (tab === 'menu' && modalType.includes('category')) {
      // 없는 카테고리 빈 목록 창 방지, 초기 카테고리로 이동
      resetCategoryState();
      /* 선택 항목 초기화는 퇴장 애니메이션 중 모달 창 변경 발생, 
      menu 탭에서는 카테고리만 list 상태 사용 중, 탭 전환 때만 초기화 적용 */
    }
  }, [submitStatus]);

  // 입력 함수
  function onChangeInputValue(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target.name;
    const value = e.target.value;
    setValue((prev) => ({ ...prev, [target]: value }));
  }

  // 폼 제출
  function onSubmitData(submitType: SubmitType) {
    return async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
      e.preventDefault();
      // 연속 제출 제한
      if (isSubmit) return;
      // 오류 발생 시 제출 제한
      if (submitIsError) return;
      const submitter = e.nativeEvent.submitter as HTMLButtonElement;
      // method 선언
      const method = submitter.name as Method;
      // 모달 제출 형식 분류
      switch (submitType) {
        case 'insert-category': {
          const target = e.target as HTMLFormElement;
          const inputElement = target.elements[0] as HTMLInputElement;
          const title = inputElement.value;
          const table = 'category-menu';
          // ----------------------------
          const itemInfo = { title };
          fetchFormCategoryItem({ method, itemInfo, table });
          // ----------------------------
          break;
        }
        case 'update-category': {
          const target = e.target as HTMLFormElement;
          const inputElement = target.elements as HTMLFormControlsCollection;
          const checkElement = inputElement.namedItem('check') as HTMLInputElement;
          // ----------------------------
          const checkedInputArr = Array(checkElement).filter((inputList) => inputList?.checked);
          // 이후 코드 실행 제한 조건 알림
          if (checkedInputArr.length <= 0) return alert('하나 이상은 선택해야 합니다');
          // DOMStringMap 직렬화
          const selectedCategoryData = checkedInputArr.map((list) => Object.assign({}, list.dataset));
          // 카테고리 정보 저장
          getListInfo({ list: selectedCategoryData });
          // msgType 할당하면 다음 모달로 전환
          changeSubmitMsgType({ msgType: method });
          // ----------------------------
          // 조건 이후 msgType 코드 실행 제한 되도록 반환
          return;
        }
        case 'upsert-category': {
          const target = e.target as HTMLFormElement;
          // 이미 update-category에서 msgType 선언된 상태
          const table = 'category-menu';
          const assignedInputs = Array.from(target.elements) as HTMLInputElement[];
          // ----------------------------
          const categoryArrData = assignedInputs
            .slice(0, -1)
            .map((input) => ({ id: Number(input.dataset.id), title: input.value }));
          fetchFormCategoryItem({ method: 'upsert', itemInfo: categoryArrData, table });
          // ----------------------------
          return;
        }
        case 'table': {
          // table 탭 모달 버튼 처리
          onSubmitDataInfo({ method });
          break;
        }
        case 'menu-insert/update': {
          const target = e.target as HTMLFormElement;
          // insert/update, 메뉴 관련 처리
          const fileObj = target[0] as HTMLInputElement;
          const fileData = fileObj.files?.[0] ?? (undefined as FileBody);
          const table = 'menu';
          // ----------------------------
          // 임시 admin id 지정
          const adminId: AdminId = 'store_1';
          // value readonly 형태, 복사해서 전달
          const itemInfo = { ...value };
          // 메뉴, 사진 정보 전달
          fetchFormMenuItem({ method, itemInfo, table, file: fileData, adminId });
          // ----------------------------
          break;
        }
        default:
      }
    };
  }

  return { onChangeInputValue, onSubmitData, value };
}
