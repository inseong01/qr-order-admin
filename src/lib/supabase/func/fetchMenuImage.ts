import { FileBody, Method } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

// 업로드 파일 경로가 잘못 되어도, 파일이 없어도 오류 발생하지 않음
//  - storage가 잘못 되면 오류 발생
//  - 에러 없을 때 error: null
// {
//   "data": null,
//   "error": {
//       "statusCode": "400",
//       "error": "Invalid Input",
//       "message": "Bucket name invalid"
//   }
// }

export default async function fetchMenuImage({
  method,
  file,
  imgPath,
}: {
  method: Method;
  file: FileBody;
  imgPath: string;
}) {
  let response;
  if (!file && method !== 'delete') return;

  switch (method) {
    case 'insert':
    case 'update': {
      // 타입 가드
      if (!file) {
        console.error(`File is empty, METHOD: ${method} FILE: ${file} IMGPath: ${imgPath}`);
        return null;
      }
      response = await supabase.storage.from('qr-order-img').upload(imgPath, file, { upsert: true });
      break;
    }
    case 'delete': {
      // 기본 사진 삭제 방지
      if (imgPath.includes('icon')) return;
      // 에러 형태: undefined
      response = await supabase.storage.from('qr-order-img').remove([imgPath]);
      break;
    }
    default: {
      console.error(`Something is wrong, METHOD: ${method} FILE: ${file} IMGPath: ${imgPath}`);
      return null;
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `Storage ${method.toUpperCase()} error`);
    return null;
  }

  return response;
}
