import { TablesUpdate } from '../../../../database.types';
import { Method } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

export default async function fetchOrderList(
  method: Method,
  data: TablesUpdate<'qr-order-allOrderList'> | undefined = undefined
) {
  let response;

  switch (method) {
    case 'select': {
      response = await supabase
        .from('qr-order-allOrderList')
        .select('*')
        .order('created_at', { ascending: true });
      break;
    }
    case 'update': {
      // id 없을 시 에러처리
      if (!data?.id) {
        console.error(`"${method.toUpperCase()}" : Method is not defined`);
        return { status: 1 };
      }
      response = await supabase
        .from('qr-order-allOrderList')
        .update({ isDone: true, updated_at: new Date().toString() })
        .eq('id', data.id)
        .select();
      break;
    }
    case 'delete': {
      // id 없을 시 에러처리
      if (!data?.id) {
        console.error(`"${method.toUpperCase()}" : Method is not defined`);
        // return { status: 1 };
        return { data: null };
      }
      response = await supabase.from('qr-order-allOrderList').delete().eq('id', data.id).select();
      break;
    }
    default: {
      console.error(`"${method.toUpperCase()}" : Method is not defined`);
      // return { status: 1 };
      return { data: null };
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`);
  }

  return response;
}
