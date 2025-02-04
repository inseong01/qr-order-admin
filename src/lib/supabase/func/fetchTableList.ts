import { Method } from '../../store/useFetchSlice';
import { Tables } from '../../../../database.types';
import supabase from '../supabaseConfig';

export type DataArr<T> = T extends 'delete'
  ? Tables<'qr-order-table-list'>['id'][]
  : Tables<'qr-order-table-list'>[];

export default async function fetchTableList(method: Method, dataArr: DataArr<Method>) {
  let response;

  switch (method) {
    case 'select': {
      response = await supabase
        .from('qr-order-table-list')
        .select('*')
        .order('tableNum', { ascending: true });
      break;
    }
    case 'create': {
      const idx = dataArr.length - 1;
      const data = dataArr[idx] as Tables<'qr-order-table-list'>;
      response = await supabase.from('qr-order-table-list').insert(data).select();
      break;
    }
    case 'update': {
      const data = dataArr as Tables<'qr-order-table-list'>[];
      response = await supabase
        .from('qr-order-table-list')
        .upsert(data, { ignoreDuplicates: false })
        .select();
      break;
    }
    case 'delete': {
      const data = dataArr as Tables<'qr-order-table-list'>['id'][];
      response = await supabase.from('qr-order-table-list').delete().in('id', data).select();
      break;
    }
    default: {
      console.error(`"${method.toUpperCase()}": Method is not defined`);
      return { status: 1 };
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`);
  }

  return response;
}
