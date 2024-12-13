import supabase from "../supabaseConfig";

export default async function fetchOrderList(method, data) {
  let response;

  switch (method) {
    case 'select': {
      response = await supabase.from('qr-order-allOrderList').select('*');
      if (response.status === 200) return response.data;
      return response;
    }
    case 'update': {
      response = await supabase.from('qr-order-allOrderList').update({ isDone: true, updated_at: new Date() }).eq('id', data.id).select();
      return response;
    }
    case 'delete': {
      response = await supabase.from('qr-order-allOrderList').delete().eq('id', data.id).select();
      return response;
    }
    default: {
      throw new Error(`"${method}" : Method is not defined!`)
    }
  }
}