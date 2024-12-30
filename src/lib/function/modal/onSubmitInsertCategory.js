import { fetchFormCategoryItem } from "../../features/submitState/submitSlice";

export function onSubmitInsertCategory({ title, dispatch, method }, table) {
  const itemInfo = { title };
  dispatch(fetchFormCategoryItem({ method, itemInfo, table }));
}