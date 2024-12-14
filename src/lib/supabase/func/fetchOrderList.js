import supabase from "../supabaseConfig";

export default async function fetchOrderList(method, data) {
  let response;

  switch (method) {
    case 'select': {
      response = await supabase.from('qr-order-allOrderList').select('*');
      if (response.error) {
        console.error(response.error.message);
        throw new Error(response.error.message);
      };
      return response.data
    }
    case 'update': {
      response = await supabase.from('qr-order-allOrderList').update({ isDone: true, updated_at: new Date() }).eq('id', data.id).select();
      if (response.error) {
        throw new Error(response.error.message)
      };
      return response;
    }
    case 'delete': {
      response = await supabase.from('qr-order-allOrderList').delete().eq('id', data.id).select();
      if (response.error) {
        throw new Error(response.error.message)
      };
      return response;
    }
    default: {
      throw new Error(`"${method}" : Method is not defined!`)
    }
  }
}