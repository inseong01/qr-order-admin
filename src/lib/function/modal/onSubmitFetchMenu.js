import { fetchFormMenuItem } from "../../features/submitState/submitSlice";

export function onSubmitFetchMenu({ file, dispatch, method, value }, table) {
  // 임시 admin id 지정
  const adminId = 'store_1';
  // 메뉴, 사진 정보 전달
  dispatch(fetchFormMenuItem({ method, itemInfo: value, table, file, adminId }));
}