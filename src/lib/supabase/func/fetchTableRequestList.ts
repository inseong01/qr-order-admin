import { Method } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

export default async function fetchTableRequestList(method: Method, id: string) {
  let response;

  switch (method) {
    case 'select': {
      response = await supabase
        .from('qr-order-request-list')
        .select('*')
        .order('created_at', { ascending: true });
      break;
    }
    case 'update': {
      response = await supabase.from('qr-order-request-list').update({ isRead: true }).eq('id', id).select();
      break;
    }
    default: {
      console.error(`"${method.toUpperCase()}" : Method is not defined`);
      return { data: [], status: 1 };
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`);
  }

  return response;
}
