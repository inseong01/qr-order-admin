import { Method } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

export default async function fetchTableRequestList(method: Method, id: string | undefined = undefined) {
  let response;

  switch (method) {
    case 'update': {
      if (!id) {
        console.error(`"${id}" : ID is not defined`);
        return null;
      }
      response = await supabase.from('qr-order-request-list').update({ isRead: true }).eq('id', id).select();
      break;
    }
    default: {
      console.error(`"${method.toUpperCase()}" : Method is not defined`);
      return null;
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`);
    return null;
  }

  return response.data;
}
