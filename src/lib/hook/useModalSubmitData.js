import { onSubmitInsertCategory } from "../function/modal/onSubmitInsertCategory";
import { openUpdateCategoryModal } from "../function/modal/openUpdateCategoryModal";
import { resetItemState } from "../features/itemState/itemSlice";
import { resetCategoryState } from "../features/categoryState/categorySlice";
import { changeSubmitMsgType, fetchFormCategoryItem } from "../features/submitState/submitSlice";
import { onSubmitDataInfo } from "../function/modal/onSubmitDataInfo";
import { onSubmitFetchMenu } from "../function/modal/onSubmitFetchMenu";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useModalSubmitData() {
  // useSelector
  const item = useSelector((state) => state.itemState.item);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const tab = useSelector((state) => state.tabState.title);
  const modalType = useSelector((state) => state.modalState.type);
  const submitStatus = useSelector((state) => state.submitState.status);
  // dispatch
  const dispatch = useDispatch();
  // useState
  const [value, setValue] = useState(item);

  // input value 업데이트
  useEffect(() => {
    setValue(item);
  }, [item]);

  // 제출 후 상태 초기화
  useEffect(() => {
    if (!isSubmit) return;
    // 주문 삭제/완료 처리 되었다면
    if (tab === 'order' && submitStatus === 'fulfilled') {
      dispatch(resetItemState());
    }
    // 카테고리 수정/삭제 되었다면
    if (tab === 'menu' && modalType.includes('category') && submitStatus === 'fulfilled') {
      // 없는 카테고리 빈 목록 창 방지, 초기 카테고리로 이동
      dispatch(resetCategoryState());
      /* 선택 항목 초기화는 퇴장 애니메이션 중 모달 창 변경 발생, 
      menu 탭에서는 카테고리만 list 상태 사용 중, 탭 전환 때만 초기화 적용 */
    }
  }, [tab, isSubmit, submitStatus, modalType]);

  // 입력 함수
  function onChangeInputValue(e) {
    const target = e.target.name;
    setValue((prev) => ({ ...prev, [target]: e.target.value }));
  }

  // 폼 제출
  function onSubmitData(type) {
    return async (e) => {
      e.preventDefault();
      if (isSubmit) return;
      // method 선언
      const method = e.nativeEvent.submitter.name;
      // 모달 제출 형식 분류
      switch (type) {
        case 'insert-category': {
          const title = e.target[0].value;
          const table = 'category-menu';
          onSubmitInsertCategory({ title, dispatch, method }, table);
          break;
        }
        case 'update-category': {
          const checkElement = e.target.elements.check;
          openUpdateCategoryModal({ checkElement, dispatch, method });
          // 조건 이후 msgType 코드 실행 제한 되도록 반환
          return;
        }
        case 'upsert-category': {
          // 이미 update-category에서 msgType 선언된 상태
          const table = 'category-menu';
          const assignedInputs = Object.assign([], e.target.elements);
          const categoryArrData = assignedInputs
            .slice(0, -1)
            .map((input) => ({ id: input.dataset.id, title: input.value }));
          dispatch(fetchFormCategoryItem({ method: 'upsert', itemInfo: categoryArrData, table }));
          return;
        }
        case 'table': {
          // table 탭 모달 버튼 처리
          onSubmitDataInfo({ method });
          break;
        }
        case 'menu-insert/update': {
          // insert/update, 메뉴 관련 처리
          const file = e.target[0].files?.[0] ?? undefined;
          const table = 'menu';
          onSubmitFetchMenu({ file, dispatch, method, value }, table);
          break;
        }
        default:
      }
      // 알림 문구 설정
      dispatch(changeSubmitMsgType({ msgType: method }));
    };
  }

  return { onChangeInputValue, onSubmitData, value }
}