import supabase from "../supabaseConfig";

// 경로가 잘못 되어도, 파일이 없어도 오류 발생하지 않음
export default async function fetchMenuImage({ method, file, imgPath }) {
  if (!file && method !== 'delete') return;

  switch (method) {
    case 'insert':
    case 'update': {
      // { "data": {...}, "error": null }
      const response = await supabase.storage.from('qr-order-img').upload(imgPath, file, { upsert: true })
      return response;
    }
    case 'delete': {
      // { "data": [{...}], "error": null }
      // 기본 사진 삭제 방지
      if (imgPath.includes('icon')) return;
      const response = await supabase.storage.from('qr-order-img').remove([imgPath])
      return response;
    }
  }
}

