import supabase from "../supabaseConfig";

export default async function fetchOrderList(method, data) {
  let response;

  switch (method) {
    case 'select': {
      response = await supabase.from('qr-order-allOrderList').select('*').order('created_at', { ascending: true });
      break;
    }
    case 'update': {
      response = await supabase.from('qr-order-allOrderList').update({ isDone: true, updated_at: new Date() }).eq('id', data.id).select();
      break
    }
    case 'delete': {
      response = await supabase.from('qr-order-allOrderList').delete().eq('id', data.id).select();
      break
    }
    default: {
      console.error(`"${method.toUpperCase()}" : Method is not defined`)
      return { status: 1 };
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`);
  };

  return response;
}