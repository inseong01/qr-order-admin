import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { changeSubmitMsgType } from '../../lib/features/submitState/submitSlice';
import { changeSubmitState, fetchFormCategoryItem } from '../../lib/features/submitState/submitSlice';
import { openUpdateCategoryModal } from '../../lib/function/modal/openUpdateCategoryModal';
import { onSubmitInsertCategory } from '../../lib/function/modal/onSubmitInsertCategory';
import { onSubmitFetchMenu } from '../../lib/function/modal/onSubmitFetchMenu';
import { onSubmitDataInfo } from '../../lib/function/modal/onSubmitDataInfo';
import MenuModal from './MenuModal';

import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LazyTableModal = lazy(() => import('./TableModal'));

export default function ModalFormState() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const item = useSelector((state) => state.itemState.item);
  const submitStatus = useSelector((state) => state.submitState.status);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // dispatch
  const dispatch = useDispatch();
  // useState
  const [value, setValue] = useState(item);

  // input value 업데이트
  useEffect(() => {
    setValue(item);
  }, [item]);

  // 제출 완료 시 모달 닫음
  useEffect(() => {
    if (tab === 'menu' && isSubmit && submitStatus === 'fulfilled') {
      dispatch(changeModalState({ isOpen: false }));
      dispatch(changeSubmitState({ isSubmit: false }));
    }
  }, [tab, isSubmit, submitStatus]);

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
        case 'info': {
          // table 탭 버튼 처리
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

  // 탭 별 모달 출력 지정
  switch (tab) {
    case 'menu': {
      return <MenuModal onSubmitData={onSubmitData} onChangeInputValue={onChangeInputValue} value={value} />;
    }
    case 'table': {
      return <LazyTableModal onSubmitData={onSubmitData} />;
    }
  }
}
