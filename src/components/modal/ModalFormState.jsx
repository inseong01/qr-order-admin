import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { changeSubmitMsgType } from '@/lib/features/submitState/submitSlice';
import { changeSubmitState } from '../../lib/features/submitState/submitSlice';
import { onSubmitDeleteCategory } from '../../lib/function/modal/onSubmitDeleteCategory';
import { onSubmitInsertCategory } from '../../lib/function/modal/onSubmitInsertCategory';
import { onSubmitFetchMenu } from '../../lib/function/modal/onSubmitFetchMenu';
import { onSubmitDataInfo } from '../../lib/function/modal/onSubmitDataInfo';
import TableModal from './TableModal';
import MenuModal from './MenuModal';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ModalFormState({ categoryList }) {
  // useSelector
  const modalType = useSelector((state) => state.modalState.type);
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
  }, [submitStatus]);

  // 입력 함수
  function onChangeInputValue(onChangeType) {
    return (e) => {
      const target = e.target.name;

      if (onChangeType === 'category') {
        setValue((prev) => ({ ...prev, [target]: e.target.value }));
      } else if (onChangeType === 'insert/update') {
        setValue((prev) => ({ ...prev, [target]: e.target.value }));
      } else {
        console.error('No input value', 'onChangeType: ', onChangeType);
      }
    };
  }

  // 폼 제출
  function onSubmitData(table) {
    return (e) => {
      e.preventDefault();
      if (isSubmit) return;
      // method 선언
      const method = e.nativeEvent.submitter.name;
      // 알림 문구 설정
      dispatch(changeSubmitMsgType({ msgType: method }));
      // 모달 제출 형식 분류
      switch (modalType) {
        case 'insert-category': {
          const title = e.target[0].value;
          onSubmitInsertCategory({ title, dispatch, method }, table);
          return;
        }
        case 'delete-category': {
          const checkElement = e.target.elements.check;
          onSubmitDeleteCategory({ checkElement, dispatch, method }, table);
          return;
        }
        case 'info': {
          onSubmitDataInfo({ method });
          return;
        }
        default: {
          const file = e.target[0].files?.[0] ?? undefined;
          onSubmitFetchMenu({ file, dispatch, method, value }, table);
        }
      }
    };
  }

  // 탭 별 모달 출력 지정
  switch (tab) {
    case 'menu': {
      return (
        <MenuModal
          onSubmitData={onSubmitData}
          onChangeInputValue={onChangeInputValue}
          value={value}
          categoryList={categoryList}
        />
      );
    }
    case 'table': {
      return <TableModal onSubmitData={onSubmitData} />;
    }
  }
}
