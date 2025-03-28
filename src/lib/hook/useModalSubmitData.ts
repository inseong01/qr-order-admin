import { AdminId, InsertMenuCategoryList } from '../../types/common';
import { useBoundStore } from '../store/useBoundStore';
import { FileBody, Method } from '../store/useFetchSlice';

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';

export type OnChangeInputValueEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type OnSubmitDataEvent = SyntheticEvent<HTMLFormElement, SubmitEvent>;

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
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const resetWidgetState = useBoundStore((state) => state.resetWidgetState);
  // useState
  const [value, setValue] = useState(item);

  // input value 업데이트
  useEffect(() => {
    setValue(item);
  }, [item]);

  // 제출 상태
  useEffect(() => {
    if (submitStatus === 'pending') {
      // 제출 시 모달 닫음
      changeModalState({ isOpen: false });
    }
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
  function onChangeInputValue(e: OnChangeInputValueEvent) {
    const target = e.target.name;
    const value = e.target.value;
    setValue((prev) => ({ ...prev, [target]: value }));
  }

  // 폼 제출
  async function onCategorySubmitData(e: OnSubmitDataEvent) {
    e.preventDefault();

    // 연속 제출 제한
    if (isSubmit) return;

    // 오류 발생 시 제출 제한
    if (submitIsError) return;

    // method 선언
    const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    const method = submitter.name as Method;

    // 모달 제출 형식 분류
    switch (method) {
      /*
        'delete', 'update'
        데이터 선택 과정 거쳐 다음 모달로 이어짐

        'insert', 'upsert'
        데이터 삽입, 변경 담당

      */
      case 'insert': {
        const target = e.target as HTMLFormElement;
        const inputElement = target.elements[0] as HTMLInputElement;
        const title = inputElement.value;
        const table = 'category-menu';
        const itemInfo = { title } as InsertMenuCategoryList;
        fetchFormCategoryItem({ method, itemInfo, table });
        resetWidgetState();
        break;
      }
      case 'delete':
      case 'update': {
        const target = e.target as HTMLFormElement;
        const inputElements = target.elements as HTMLFormControlsCollection;
        const checkElements = inputElements.namedItem('check') as RadioNodeList;
        const checkedElementArr = Array.from(checkElements).filter((inputList) => {
          const input = inputList as HTMLInputElement;
          return input.checked;
        });

        if (checkedElementArr.length <= 0) return alert('하나 이상은 선택해야 합니다');

        // DOMStringMap 직렬화
        const selectedCategoryData = checkedElementArr.map((list) => {
          const data = list as HTMLInputElement;
          const dataSet = data.dataset as DOMStringMap;
          return Object.assign({}, dataSet);
        });

        // 카테고리 정보 저장
        getListInfo({ list: selectedCategoryData });

        // 다음 모달로 전환
        changeSubmitMsgType({ msgType: method });

        return;
      }
      case 'upsert': {
        const target = e.target as HTMLFormElement;
        const table = 'category-menu';
        const assignedInputs = Array.from(target.elements) as HTMLInputElement[];
        const categoryArrData = assignedInputs
          .slice(0, -1)
          .map((input) => ({ id: Number(input.dataset.id), title: input.value }));
        fetchFormCategoryItem({ method: 'upsert', itemInfo: categoryArrData, table });
        resetWidgetState();
        return;
      }
      default:
    }
  }

  async function onMenuSubmitData(e: OnSubmitDataEvent) {
    e.preventDefault();

    // 연속 제출 제한
    if (isSubmit) return;

    // 오류 발생 시 제출 제한
    if (submitIsError) return;

    // method 선언
    const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    const method = submitter.name as Method;

    // 모달 제출 형식 분류
    switch (method) {
      case 'insert':
      case 'delete':
      case 'update': {
        // insert/update, 메뉴 관련 처리
        const target = e.target as HTMLFormElement;
        const fileObj = target[0] as HTMLInputElement;
        const fileData = fileObj.files?.[0] ?? (undefined as FileBody);
        const table = 'menu';

        // 임시 admin id 지정
        const adminId: AdminId = 'store_1';

        // value readonly 형태, 복사해서 전달
        const itemInfo = { ...value };

        // 메뉴, 사진 정보 전달
        fetchFormMenuItem({ method, itemInfo, table, file: fileData, adminId });
        break;
      }
      default: {
        console.log('Default, method: ', method);
      }
    }
  }

  async function onTableSubmitData(e: OnSubmitDataEvent) {
    e.preventDefault();
    // 연속 제출 제한
    if (isSubmit) return;
    // 오류 발생 시 제출 제한
    if (submitIsError) return;
    const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    // method 선언
    const method = submitter.name as Method;
    // 모달 제출 형식 분류
    switch (method) {
      case 'update': {
        alert('결제를 시작합니다.');
        break;
      }
      case 'select': {
        alert('QR코드 확인');
        break;
      }
      default:
    }
  }

  return { onChangeInputValue, onMenuSubmitData, onTableSubmitData, onCategorySubmitData, value };
}
