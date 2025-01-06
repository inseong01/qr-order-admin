import { useQueryClient } from '@tanstack/react-query';
import CreateAndEditMenu from './menu/CreateAndEditMenu';
import DeleteCategory from './menu/DeleteCategory';
import InsertCategory from './menu/InsertCategory';

import { useSelector } from 'react-redux';

export default function MenuModal({ onSubmitData, onChangeInputValue, value }) {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const modalType = useSelector((state) => state.modalState.type);
  // useQueryClient
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(['categoryList', { tab }]) || [];

  switch (modalType) {
    case 'insert':
    case 'update': {
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
