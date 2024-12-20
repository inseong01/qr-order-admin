import supabase from "../supabaseConfig";

// 경로가 잘못 되어도, 파일이 없어도 오류 발생하지 않음
export default async function fetchMenuImage({ method, file, imgPath }) {
  if (!file && method !== 'delete') return;

  switch (method) {
    case 'insert':
    case 'update': {
      // { "data": {...}, "error": null }
      const response = await supabase.storage.from('qr-order-img').upload(imgPath, file, { upsert: true })
      if (response.error) {
        console.error(response.error.message);
        throw new Error(response.error.message);
      }
      return response;
    }
    case 'delete': {
      // { "data": [{...}], "error": null }
      const response = await supabase.storage.from('qr-order-img').remove([imgPath])
      if (response.error) {
        console.error(response.error.message);
        throw new Error(response.error.message);
      }
      return response;
    }
  }
}

