import { getListInfo } from "../../features/itemState/itemSlice";
import { changeSubmitMsgType } from "../../features/submitState/submitSlice";

export function openUpdateCategoryModal({ checkElement, dispatch, method }) {
  const checkedInputArr = Array.from(checkElement).filter((inputList) => inputList?.checked);
  // 이후 코드 실행 제한 조건 알림
  if (checkedInputArr.length <= 0) return alert('하나 이상은 선택해야 합니다');
  // DOMStringMap 직렬화
  const selectedCategoryData = checkedInputArr.map((list) => Object.assign({}, list.dataset));
  // 카테고리 정보 저장
  dispatch(getListInfo({ list: selectedCategoryData }));
  // msgType 할당하면 다음 모달로 전환 
  dispatch(changeSubmitMsgType({ msgType: method }));
}