import useModalSubmitData from '../../lib/hook/useModalSubmitData';
import { useBoundStore } from '../../lib/store/useBoundStore';
import CreateAndEditMenu from './menu/CreateAndEditMenu';
import UpdateCategory from './menu/UpdateCategory';
import InsertCategory from './menu/InsertCategory';
import ConfirmModal from './ConfirmModal';

import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export default function MenuModal() {
  // useSelector
  // const submitMsgType = useSelector((state) => state.submitState.msgType);
  // hook
  const { onChangeInputValue, onSubmitData, value } = useModalSubmitData();
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const modalType = useBoundStore((state) => state.modal.type);
  const selectedList = useBoundStore((state) => state.itemBox.list);
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
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
