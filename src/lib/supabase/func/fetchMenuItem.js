import supabase from "../supabaseConfig";

export default async function fetchMenuItem({ method, itemInfo, table }) {
  let response;

  // method 분류
  // itemInfo = []
  switch (method) {
    case 'insert': {
      response = await supabase.from(`qr-order-${table}`).insert(itemInfo).select();
      return response;
    }
    case 'update': {
      response = await supabase.from(`qr-order-${table}`).update(itemInfo).eq('id', Number(itemInfo[0].id)).select();
      return response;
    }
    case 'delete': {
      const idArr = itemInfo.map(item => item.id); // 배열화 필요
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr);
      return response;
    }
    default: {
      throw new Error(`Method: ${method} is not defined`);
    }
  }
}