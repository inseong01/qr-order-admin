import { useQueryClient } from '@tanstack/react-query';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import { MenuCategoryList } from '../../../types/common';

import useModalSubmitData from '../hook/use-modal-submit-data';

import ConfirmModal from '../confirm/confirm-modal';
import InsertCategory from './insert-category/category-index';
import CreateOrEditMenuItem from './create-edit-menu/menu-index';
import UpdateCategory from './update-category/category-index';

export default function MenuModalRouter() {
  const { onChangeInputValue, onCategorySubmitData, onMenuSubmitData, value } = useModalSubmitData();

  const tab = useBoundStore((state) => state.tab.title);
  const modalType = useBoundStore((state) => state.modal.type);
  const selectedList = useBoundStore((state) => state.itemBox.list) as MenuCategoryList[];
  const submitMsgType = useBoundStore((state) => state.submit.msgType);

  const queryClient = useQueryClient();
  const queryCategoryRes = queryClient.getQueryData(['categoryList', { tab }]);
  const categoryList = queryCategoryRes ? (queryCategoryRes as MenuCategoryList[]) : [];

  const isCateogoryDelete = submitMsgType === 'delete' && selectedList.length > 0;
  const isCateogoryUpdate = submitMsgType === 'update' && selectedList.length > 0;

  switch (modalType) {
    case 'insert':
    case 'update': {
      return (
        <CreateOrEditMenuItem
          onSubmitData={onMenuSubmitData}
          onChangeInputValue={onChangeInputValue}
          categoryList={categoryList}
          value={value}
        />
      );
    }
    case 'insert-category': {
      return (
        <InsertCategory type={'insert'} onSubmitData={onCategorySubmitData} onChangeInputValue={onChangeInputValue} />
      );
    }
    case 'update-category': {
      if (isCateogoryDelete) return <ConfirmModal title={'카테고리'} />;

      if (isCateogoryUpdate)
        return (
          <InsertCategory type={'update'} onSubmitData={onCategorySubmitData} onChangeInputValue={onChangeInputValue} />
        );

      return <UpdateCategory onSubmitData={onCategorySubmitData} categoryList={categoryList} />;
    }
  }
}
