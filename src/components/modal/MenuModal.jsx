import useModalSubmitData from '../../lib/hook/useModalSubmitData';
import CreateAndEditMenu from './menu/CreateAndEditMenu';
import UpdateCategory from './menu/UpdateCategory';
import InsertCategory from './menu/InsertCategory';
import ConfirmModal from './ConfirmModal';

import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export default function MenuModal() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const modalType = useSelector((state) => state.modalState.type);
  const submitMsgType = useSelector((state) => state.submitState.msgType);
  const selectedList = useSelector((state) => state.itemState.list);
  // hook
  const { onChangeInputValue, onSubmitData, value } = useModalSubmitData();
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
          categoryList={categoryList}
          value={value}
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
      if (isCateogoryDelete) return <ConfirmModal title={'카테고리'} />;
      if (isCateogoryUpdate)
        return (
          <InsertCategory
            type={'update'}
            onSubmitData={onSubmitData('upsert-category')}
            onChangeInputValue={onChangeInputValue}
          />
        );
      return <UpdateCategory onSubmitData={onSubmitData('update-category')} categoryList={categoryList} />;
    }
  }
}
