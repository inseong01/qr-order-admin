import CreateAndEditMenu from './menu/CreateAndEditMenu';
import DeleteCategory from './menu/DeleteCategory';
import InsertCategory from './menu/InsertCategory';

import { useSelector } from 'react-redux';

export default function MenuModal({ onSubmitData, onChangeInputValue, value, categoryList }) {
  const modalType = useSelector((state) => state.modalState.type);
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
