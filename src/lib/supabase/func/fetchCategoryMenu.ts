import { InsertMenuCategoryList, MenuCategoryList } from '../../../types/common';
import { Method, Table } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

type ItemInfo = MenuCategoryList | InsertMenuCategoryList | MenuCategoryList[];

export default async function fetchCategoryMenu({
  method,
  itemInfo,
  table,
}: {
  method: Method;
  itemInfo: ItemInfo;
  table: Table;
}) {
  let response;

  switch (method) {
    case 'insert': {
      const data = itemInfo as InsertMenuCategoryList;
      response = await supabase.from(`qr-order-${table}`).insert([data]).select();
      break;
    }
    case 'upsert': {
      const data = itemInfo as MenuCategoryList[];
      // 선택한 카테고리 업데이트
      response = await supabase.from(`qr-order-${table}`).upsert(data, { ignoreDuplicates: false }).select();
      break;
    }
    case 'delete': {
      const data = itemInfo as MenuCategoryList[];
      // itemInfo type: 카테고리 -> 배열
      const idArr = [...data].map((item) => item.id);
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr);
      break;
    }
    default: {
      console.error(`Method: ${method.toUpperCase()} is not defined`);
      return null;
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`);
    return null;
  }

  return response;
}
