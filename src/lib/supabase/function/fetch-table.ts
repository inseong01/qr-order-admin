import { TableList } from '../../../types/common';

import { FetchMethod } from '../../store/slices/fetch-slice';

import supabase from '../supabase-config';

export type TableDataArr<T> = T extends 'delete' ? TableList['id'][] : TableList[];

export async function fetchTableList(method: FetchMethod, dataArr?: TableDataArr<FetchMethod>) {
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
      response = await supabase.from('qr-order-table-list').upsert(data, { ignoreDuplicates: false }).select();
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

  const isNoneData = response.data?.length === 0;

  if (response.error || isNoneData) {
    const deleteDenyMsg = isNoneData && ': The request for deletion has been denied';

    console.error(response.error?.message ?? `${method.toUpperCase()} Error ${deleteDenyMsg}`);

    return null;
  }

  return response;
}

export async function fetchTableRequestList(method: FetchMethod, id: string | undefined = undefined) {
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
