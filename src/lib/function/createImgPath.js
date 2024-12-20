export default function createImgPath({ method, file, menuInfo, adminId }) {
  let imgPath = '';
  let imgName = '';

  if (method !== 'delete') {
    const imgType = file?.type.split('/')[1];
    imgName = imgType ? 'menu_' + menuInfo.id + '.' + imgType : 'icon.jpg';
    imgPath = adminId + '/' + imgName;
    // menuItem url 설정
    menuInfo.url = imgPath;
  } else {
    imgPath = menuInfo.url;
  }

  // 기본사진 삭제 방지
  if (imgName === 'icon.jpg') return '';


  return imgPath;
}