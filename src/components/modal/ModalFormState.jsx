import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { changeSubmitMsgType } from '@/lib/features/submitState/submitSlice';
import { changeSubmitState } from '../../lib/features/submitState/submitSlice';
import { onSubmitDeleteCategory } from '../../lib/function/modal/onSubmitDeleteCategory';
import { onSubmitInsertCategory } from '../../lib/function/modal/onSubmitInsertCategory';
import { onSubmitFetchMenu } from '../../lib/function/modal/onSubmitFetchMenu';
import { onSubmitDataInfo } from '../../lib/function/modal/onSubmitDataInfo';
import TableInfoModal from './TableInfoModal';
import DeleteCategory from './menu/DeleteCategory';
import InsertCategory from './menu/InsertCategory';
import CreateAndEditMenu from './menu/CreateAndEditMenu';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../../lib/function/debounce';

function MenuModal({ onSubmitData, onChangeInputValue, value, categoryList }) {
  const modalType = useSelector((state) => state.modalState.type); // 기본: '', 'add'/'edit'/'category'
  switch (modalType) {
    case 'add':
    case 'edit': {
      return (
        <CreateAndEditMenu
          onSubmitData={onSubmitData}
          onChangeInputValue={onChangeInputValue}
          value={value}
          categoryList={categoryList}
        />
      );
    }
    case 'insert-category': {
      return <InsertCategory onSubmitData={onSubmitData} onChangeInputValue={onChangeInputValue} />;
    }
    case 'delete-category': {
      return <DeleteCategory onSubmitData={onSubmitData} categoryList={categoryList} />;
    }
  }
}

function TableModal({ onSubmitData }) {
  const modalType = useSelector((state) => state.modalState.type); // 기본: '', 'add'/'edit'/'category'
  switch (modalType) {
    case 'info': {
      // MainPageTableTab.jsx
      return <TableInfoModal onSubmitData={onSubmitData} />;
    }
  }
}

export default function ModalFormState({ categoryList }) {
  // useSelector
  const modalType = useSelector((state) => state.modalState.type); // 기본: '', 'add'/'edit'/'category'
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

  /* debounce 적용하기 */
  // 입력 함수
  function updateValue(target, value) {
    setValue((prev) => ({ ...prev, [target]: value }));
  }
  function onChangeInputValue(onChangeType) {
    console.log('onchange');
    return (e) => {
      const target = e.target.name;

      if (onChangeType === 'category') {
        updateValue(target, e.target.value);
        // setValue((prev) => ({ ...prev, [target]: e.target.value }));
      } else if (onChangeType === 'add/edit') {
        updateValue(target, e.target.value);
        // setValue((prev) => ({
        //   ...prev,
        //   [target]: e.target.value,
        // }));
      } else {
        console.error('No input value', 'onChangeType: ', onChangeType);
      }
    };
  }
  // debounce 적용한 입력함수
  function handleInputChange(onChangeType) {
    const debouncedOnChangeInputValue = debounce(onChangeInputValue(setValue, onChangeType), 1000);
    return (e) => debouncedOnChangeInputValue(e);
  }

  // 폼 제출
  function onSubmitData(table) {
    return (e) => {
      e.preventDefault();
      if (isSubmit) return;
      // method 선언
      const method = e.nativeEvent.submitter.name;
      // 알림 문구 설정
      dispatch(changeSubmitMsgType({ msgType: modalType.split('-')[0] }));
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
          onChangeInputValue={handleInputChange}
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
