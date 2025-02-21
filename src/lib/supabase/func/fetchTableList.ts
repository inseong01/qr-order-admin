import { Method } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';
import { TableList } from '../../../types/common';

export type DataArr<T> = T extends 'delete' ? TableList['id'][] : TableList[];

export default async function fetchTableList(method: Method, dataArr?: DataArr<Method>) {
  let response;

  switch (method) {
    case 'insert': {
      const dataList = dataArr as TableList[];
      const idx = dataList.length - 1;
      const data = dataList[idx];
      response = await supabase.from('qr-order-table-list').insert(data).select();
      break;
    }
    case 'update': {
      const data = dataArr as TableList[];
      response = await supabase
        .from('qr-order-table-list')
        .upsert(data, { ignoreDuplicates: false })
        .select();
      break;
    }
    case 'delete': {
      const data = dataArr as TableList['id'][];
      response = await supabase.from('qr-order-table-list').delete().in('id', data).select();
      break;
    }
    default: {
      console.error(`"${method.toUpperCase()}": Method is not defined`);
      return null;
    }
  }

  if (response.error) {
    console.error(response?.error.message ?? `${method.toUpperCase()} error`);
    return null;
  }

  return response;
}
