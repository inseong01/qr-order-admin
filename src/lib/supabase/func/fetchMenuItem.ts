import { Tables } from '../../../../database.types';
import { Method, Table } from '../../store/useFetchSlice';
import supabase from '../supabaseConfig';

type ItemInfo<T> = T extends 'menu' ? Tables<'qr-order-menu'> : Tables<'qr-order-category-menu'>;

export default async function fetchMenuItem({
  method,
  itemInfo,
  table,
}: {
  method: Method;
  itemInfo: ItemInfo<Table>;
  table: Table;
}) {
  let response;

  switch (method) {
    case 'insert': {
      response = await supabase.from(`qr-order-${table}`).insert([itemInfo]).select();
      break;
    }
    case 'update': {
      // 동작하지 않는다면 [itemInfo] 문제
      response = await supabase.from(`qr-order-${table}`).update(itemInfo).eq('id', itemInfo.id).select();
      break;
    }
    case 'upsert': {
      // 선택한 카테고리 업데이트
      response = await supabase
        .from(`qr-order-${table}`)
        .upsert(itemInfo, { ignoreDuplicates: false })
        .select();
      break;
    }
    case 'delete': {
      const isArray = Array.isArray(itemInfo);
      // itemInfo type: 카테고리 -> 배열 : 메뉴 -> 객체
      const idArr = isArray ? [...itemInfo].map((item) => item.id) : [itemInfo].map((item) => item.id);
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr);
      break;
    }
    default: {
      console.error(`Method: ${method.toUpperCase()} is not defined`);
      return { status: 1 };
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`);
  }

  return response;
}
