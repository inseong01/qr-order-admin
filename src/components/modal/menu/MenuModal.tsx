import useModalSubmitData from '../../../lib/hook/useModalSubmitData';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { MenuCategoryList } from '../../../types/common';
import ConfirmModal from '../ConfirmModal';
import CreateAndEditMenu from './CreateAndEditMenu';
import UpdateCategory from './UpdateCategory';
import InsertCategory from './InsertCategory';

import { useQueryClient } from '@tanstack/react-query';

export default function MenuModal() {
  // hook
  const { onChangeInputValue, onCategorySubmitData, onMenuSubmitData, value } =
    useModalSubmitData();
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const modalType = useBoundStore((state) => state.modal.type);
  const selectedList = useBoundStore((state) => state.itemBox.list) as MenuCategoryList[];
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
  // useQueryClient
  const queryClient = useQueryClient();
  const queryCategoryRes = queryClient.getQueryData(['categoryList', { tab }]);
  const categoryList = queryCategoryRes ? (queryCategoryRes as MenuCategoryList[]) : [];
  // variant
  const isCateogoryDelete = submitMsgType === 'delete' && selectedList.length > 0;
  const isCateogoryUpdate = submitMsgType === 'update' && selectedList.length > 0;

  switch (modalType) {
    case 'insert':
    case 'update': {
      return (
        <CreateAndEditMenu
          onSubmitData={onMenuSubmitData}
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
          onSubmitData={onCategorySubmitData}
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
            onSubmitData={onCategorySubmitData}
            onChangeInputValue={onChangeInputValue}
          />
        );
      return <UpdateCategory onSubmitData={onCategorySubmitData} categoryList={categoryList} />;
    }
  }
}
