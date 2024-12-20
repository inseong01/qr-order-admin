import supabase from "../supabaseConfig";

export default async function fetchMenuItem({ method, menuInfo, table }) {
  let response;

  // method 분류
  // menuInfo = []
  switch (method) {
    case 'insert': {
      response = await supabase.from(`qr-order-${table}`).insert([menuInfo]).select();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    }
    case 'update': {
      response = await supabase.from(`qr-order-${table}`).update([menuInfo]).eq('id', menuInfo.id).select();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    }
    case 'delete': {
      const idArr = [menuInfo].map(item => item.id); // 배열화 필요
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