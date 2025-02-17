import { AdminId, MenuList } from '../../types/common';
import { FileBody, Method } from '../store/useFetchSlice';

export default function createImgPath({
  method,
  file,
  itemInfo,
  adminId,
}: {
  method: Method;
  file?: FileBody;
  itemInfo: MenuList;
  adminId: AdminId;
}) {
  let imgPath = '';
  let imgName = '';

  if (method !== 'delete') {
    const imgType = file?.type.split('/')[1];
    // 사진 유무, 기본 경로 설정
    imgName = imgType ? 'menu_' + itemInfo.id + '.' + imgType : 'icon.jpg';
    imgPath = adminId + '/' + imgName;
    // menuItem url 설정
    itemInfo.url = imgPath;
  } else {
    imgPath = itemInfo.url;
  }

  // 기본사진 삭제 방지
  if (imgName === 'icon.jpg') return '';

  return imgPath;
}
