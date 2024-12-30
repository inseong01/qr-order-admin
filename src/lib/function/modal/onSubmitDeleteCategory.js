import { fetchFormCategoryItem } from "../../features/submitState/submitSlice";
import { changeModalState } from '@/lib/features/modalState/modalSlice';

export function onSubmitDeleteCategory({ checkElement, dispatch, method }, table) {
  const checkedInputArr = Array.from(checkElement).filter(
    (inputList) => inputList?.checked
  );

  if (checkedInputArr.length <= 0) return alert('하나 이상은 선택해야 합니다');

  const deleteCategoryData = checkedInputArr.map((list) => list.dataset);
  dispatch(fetchFormCategoryItem({ method, itemInfo: deleteCategoryData, table }));
  dispatch(changeModalState({ isOpen: false }));
}