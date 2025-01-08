import { useQueryClient } from '@tanstack/react-query';
import CreateAndEditMenu from './menu/CreateAndEditMenu';
import UpdateCategory from './menu/UpdateCategory';
import InsertCategory from './menu/InsertCategory';
import ConfirmModal from './ConfirmModal';

import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage';

export default function MenuModal({ onSubmitData, onChangeInputValue, value }) {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const modalType = useSelector((state) => state.modalState.type);
  const submitMsgType = useSelector((state) => state.submitState.msgType);
  const selectedList = useSelector((state) => state.itemState.list);
  // useQueryClient
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(['categoryList', { tab }]) || [];
  // variant
  const isCateogoryDelete = submitMsgType === 'delete' && selectedList.length > 0;
  const isCateogoryUpdate = submitMsgType === 'update' && selectedList.length > 0;

  switch (modalType) {
    case 'insert':
    case 'update': {
      return (
        <CreateAndEditMenu
          onSubmitData={onSubmitData('menu-insert/update')}
          onChangeInputValue={onChangeInputValue}
          value={value}
          categoryList={categoryList}
        />
      );
    }
    case 'insert-category': {
      return (
        <InsertCategory
          type={'insert'}
          onSubmitData={onSubmitData('insert-category')}
          onChangeInputValue={onChangeInputValue}
        />
      );
    }
    case 'update-category': {
      return (
        <>
          {submitMsgType === '' ? (
            <UpdateCategory onSubmitData={onSubmitData('update-category')} categoryList={categoryList} />
          ) : isCateogoryDelete ? (
            <ConfirmModal title={'카테고리'} />
          ) : isCateogoryUpdate ? (
            <InsertCategory
              type={'update'}
              onSubmitData={onSubmitData('upsert-category')}
              onChangeInputValue={onChangeInputValue}
            />
          ) : (
            <ErrorPage compName={'MenuModal'} />
          )}
        </>
      );
    }
  }
}
