import supabase from "../supabaseConfig";

export default async function fetchMenuItem({ method, itemInfo, table }) {
  let response;

  switch (method) {
    case 'insert': {
      response = await supabase.from(`qr-order-${table}`).insert([itemInfo]).select();
      break;
    }
    case 'update': {
      response = await supabase.from(`qr-order-${table}`).update([itemInfo]).eq('id', itemInfo.id).select();
      break;
    }
    case 'upsert': {
      // 선택한 카테고리 업데이트 
      response = await supabase.from(`qr-order-${table}`).upsert(itemInfo, { ignoreDuplicates: false }).select();
      break;
    }
    case 'delete': {
      const isArray = Array.isArray(itemInfo);
      // itemInfo type: 카테고리 -> 배열 : 메뉴 -> 객체
      const idArr = isArray ? [...itemInfo].map(item => item.id) : [itemInfo].map(item => item.id);
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr);
      break;
    }
    default: {
      console.error(`Method: ${method.toUpperCase()} is not defined`);
      return { status: 1 }
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`)
  }

  return response;
}