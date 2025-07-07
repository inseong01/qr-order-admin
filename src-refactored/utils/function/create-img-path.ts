import { AdminId, MenuList } from '../../types/common';
import { FetchMethod, FileBody } from '../../lib/store/slices/fetch-slice';

/**
 * HTTP 메서드, 파일, 메뉴 정보를 기반으로 이미지 경로를 생성하거나 기존 경로를 반환합니다.
 *
 * @param {object} params - 이미지 경로 생성에 필요한 파라미터.
 * @param {FetchMethod} params.method - HTTP 요청 메서드 ('post', 'put', 'delete' 등).
 * @param {FileBody} [params.file] - 업로드할 파일 객체. 'delete' 메서드에서는 사용되지 않습니다.
 * @param {MenuList} params.itemInfo - 메뉴 아이템 정보. 이미지 URL이 업데이트될 수 있습니다.
 * @param {AdminId} params.adminId - 관리자 ID. 이미지 저장 경로에 사용됩니다.
 * @returns {string} 생성되거나 기존의 이미지 경로. 기본 이미지('icon.jpg')의 경우 빈 문자열을 반환하여 삭제를 방지합니다.
 */
export function createImgPath({
  method,
  file,
  itemInfo,
  adminId,
}: {
  method: FetchMethod;
  file?: FileBody;
  itemInfo: MenuList;
  adminId: AdminId;
}): string {
  let imgPath = '';
  let imgName = '';

  // 'delete' 메서드가 아닐 경우, 이미지 경로를 생성하거나 업데이트합니다.
  if (method !== 'delete') {
    const imgType = file?.type.split('/')[1];

    imgName = imgType ? `menu_${itemInfo.id}.${imgType}` : 'icon.jpg';
    imgPath = `${adminId}/${imgName}`;

    itemInfo.url = imgPath;
  } else {
    // 'delete' 메서드일 경우, 기존 이미지 경로를 사용합니다.
    imgPath = itemInfo.url;
  }

  // 기본 이미지는 삭제되지 않도록 빈 문자열을 반환합니다.
  if (imgName === 'icon.jpg') {
    return '';
  }

  return imgPath;
}
