import supabase from "../supabaseConfig";

export default async function fetchMenuItem({ method, itemInfo, table }) {
  let response;

  // method 분류
  // itemInfo = []
  switch (method) {
    case 'insert': {
      response = await supabase.from(`qr-order-${table}`).insert([itemInfo]).select();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    }
    case 'update': {
      response = await supabase.from(`qr-order-${table}`).update([itemInfo]).eq('id', itemInfo.id).select();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    }
    case 'delete': {
      const isArray = Array.isArray(itemInfo);
      const idArr = isArray ? [...itemInfo].map(item => item.id) : [itemInfo].map(item => item.id); // 카테고리 배열 : 메뉴 객체
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    }
    default: {
      throw new Error(`Method: ${method} is not defined`);
    }
  }
}