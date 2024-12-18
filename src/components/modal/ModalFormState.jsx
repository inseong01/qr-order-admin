import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { changeSubmitMsgType, fetchFormData } from '@/lib/features/submitState/submitSlice';
import TableInfoModal from './TableInfoModal';
import DeleteCategory from './menu/DeleteCategory';
import AddCategory from './menu/AddCategory';
import CreateAndEditMenu from './menu/CreateAndEditMenu';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRcode from 'qrcode';

export default function ModalFormState({ categoryList }) {
  // useSelector
  const modalType = useSelector((state) => state.modalState.type); // 기본: '', 'add'/'edit'/'category'
  const tab = useSelector((state) => state.tabState.state);
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

  // 제출 완료 되면 모달 닫기
  useEffect(() => {
    if (tab === 'menu' && isSubmit && submitStatus === 'fulfilled') {
      dispatch(changeModalState({ isOpen: false }));
      // dispatch(resetSubmitState()); // alertMsg 나오지 않았던 원인
    }
  }, [submitStatus]);

  function onChangeInputValue(onChangeType) {
    return (e) => {
      const target = e.target.name;
      if (onChangeType === 'category') {
        setValue((prev) => (prev = { [target]: e.target.value }));
      } else if (onChangeType === 'add/edit') {
        setValue((prev) => ({
          ...prev,
          [target]: e.target.value,
        }));
      } else {
        console.log('No input value', 'onChangeType: ', onChangeType);
      }
    };
  }

  function onSubmitData(table) {
    return (e) => {
      const method = e.nativeEvent.submitter.name;
      e.preventDefault();
      if (isSubmit) return;
      dispatch(changeSubmitMsgType({ msgType: modalType.split('-')[0] }));
      switch (modalType) {
        case 'delete-category': {
          const checkedInputArr = Array.from(e.target.elements.check).filter(
            (inputList) => inputList?.checked
          );
          if (checkedInputArr.length <= 0) return alert('하나 이상은 선택해야 합니다');
          const deleteCategoryData = checkedInputArr.map((list) => list.dataset);
          dispatch(fetchFormData({ method, itemInfo: deleteCategoryData, table }));
          dispatch(changeModalState({ isOpen: false }));
          return;
        }
        case 'info': {
          if (method === 'pay') {
            alert('결제를 시작합니다.');
            // 고객 결제 요청
            // 고객 반응
            // 결제 완료
            // 해당 테이블 초기화
          } else if (method === 'qrcode') {
            alert('QR코드 확인');
            QRcode.toDataURL('www.naver.com')
              .then((url) => console.log(url))
              .catch((err) => console.error(err));
          }
          return;
        }
        default: {
          dispatch(fetchFormData({ method, itemInfo: [value], table }));
          dispatch(changeModalState({ isOpen: false }));
        }
      }
    };
  }

  if (tab === 'menu') {
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
      case 'add-category': {
        return <AddCategory onSubmitData={onSubmitData} onChangeInputValue={onChangeInputValue} />;
      }
      case 'delete-category': {
        return <DeleteCategory onSubmitData={onSubmitData} categoryList={categoryList} />;
      }
    }
  } else if (tab === 'table') {
    switch (modalType) {
      case 'info': {
        // MainPageTableTab.jsx
        return <TableInfoModal onSubmitData={onSubmitData} />;
      }
    }
  }
}
