import { InsertMenuCategoryList, MenuCategoryList, MenuList } from '../../../types/common';

import { FetchMethod, FileBody, Table } from '../../../lib/store/slices/fetch-slice';

import supabase from '../../../lib/supabase/supabase-config';

type ItemInfo = MenuCategoryList | InsertMenuCategoryList | MenuCategoryList[];

export async function fetchCategoryMenu({
  method,
  itemInfo,
  table,
}: {
  method: FetchMethod;
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
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr).select();
      break;
    }
    default: {
      console.error(`Method: ${method.toUpperCase()} is not defined`);
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

export async function fetchMenuImage({
  method,
  file,
  imgPath,
}: {
  method: FetchMethod;
  file: FileBody;
  imgPath: string;
}) {
  let response;
  if (!file && method !== 'delete') return;

  switch (method) {
    case 'insert':
    case 'update': {
      // 타입 가드
      if (!file) {
        console.error(`File is empty, METHOD: ${method} FILE: ${file} IMGPath: ${imgPath}`);
        return null;
      }
      response = await supabase.storage.from('qr-order-img').upload(imgPath, file, { upsert: true });
      break;
    }
    case 'delete': {
      // 기본 사진 삭제 방지
      if (imgPath.includes('icon')) return;
      // 에러 형태: undefined
      response = await supabase.storage.from('qr-order-img').remove([imgPath]);
      break;
    }
    default: {
      console.error(`Something is wrong, METHOD: ${method} FILE: ${file} IMGPath: ${imgPath}`);
      return null;
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `Storage ${method.toUpperCase()} error`);
    return null;
  }

  return response;
}

export async function fetchMenuItem({
  method,
  itemInfo,
  table,
}: {
  method: FetchMethod;
  itemInfo: MenuList;
  table: Table;
}) {
  let response;

  switch (method) {
    case 'insert': {
      response = await supabase.from(`qr-order-${table}`).insert([itemInfo]).select();
      break;
    }
    case 'update': {
      const id = itemInfo.id;
      // 동작하지 않는다면 [itemInfo] 문제
      response = await supabase.from(`qr-order-${table}`).update(itemInfo).eq('id', id).select();
      break;
    }
    case 'delete': {
      // itemInfo type:  메뉴 -> 객체
      const idArr = [itemInfo].map((item) => item.id);
      response = await supabase.from(`qr-order-${table}`).delete().in('id', idArr).select();
      break;
    }
    default: {
      console.error(`Method: ${method.toUpperCase()} is not defined`);
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
