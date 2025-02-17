import { AllOrderList } from '../../../types/common';
import { Method } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

export default async function fetchOrderList(method: Method, data?: AllOrderList) {
  let response;

  switch (method) {
    case 'update': {
      const list = data as AllOrderList;
      response = await supabase
        .from('qr-order-allOrderList')
        .update({ isDone: true, updated_at: new Date() })
        .eq('id', list.id)
        .select();
      break;
    }
    case 'delete': {
      const list = data as AllOrderList;
      response = await supabase.from('qr-order-allOrderList').delete().eq('id', list.id).select();
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

  return response;
}
