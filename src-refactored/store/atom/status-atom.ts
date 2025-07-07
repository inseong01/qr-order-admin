import { atom } from 'jotai';
import {
  fetchCategoryMenu,
  fetchMenuImage,
  fetchMenuItem,
  fetchOrderList,
  fetchTableList,
  fetchTableRequestList,
} from '../../lib/supabase/function';
import { createImgPath } from '../../utils/function';
import { AdminId, AllOrderList, InsertMenuCategoryList, MenuCategoryList, MenuList } from '../../../types/common';
import { TableDataArr } from '../../lib/supabase/function/fetch-table';

//- zustand
// export type MsgType = 'complete' | 'update' | 'insert' | 'create' | 'delete' | '' | FetchMethod;
// type LoadStatus = 'pending' | 'fulfilled' | 'rejected' | '';
// type AlertType = 'menu' | 'category' | 'list' | 'product' | '';

// type InitialState = {
//   submit: {
//     isSubmit: boolean;
//     status: LoadStatus;
//     alertType: AlertType;
//     msgType: MsgType;
//     callCount: number;
//     isError: boolean;
//   };
// };

//- jotai
export type FetchMethod = 'select' | 'update' | 'delete' | 'upsert' | 'insert' | '';
export type Table = 'category-menu' | 'menu';
export type FileBody = File | undefined;
export type MsgType = 'complete' | 'update' | 'insert' | 'create' | 'delete' | '' | FetchMethod;
type LoadStatus = 'pending' | 'fulfilled' | 'rejected' | '';
type AlertType = 'menu' | 'category' | 'list' | 'product' | '';

type Submit = {
  isSubmit: boolean;
  status: LoadStatus;
  alertType: AlertType;
  msgType: MsgType;
  callCount: number;
  isError: boolean;
};

const initialSubmit: Submit = {
  isSubmit: false,
  status: '',
  alertType: '',
  msgType: '',
  callCount: 0,
  isError: false,
};

// 제출 상태
export const submitAtom = atom<Submit>(initialSubmit);

// 제출 상태 초기화
export const resetSubmitAtom = atom(null, (_, set) => {
  set(submitAtom, initialSubmit);
});

// 제출 메시지 타입 설정
export const submitMsgTypeAtom = atom(
  (get) => get(submitAtom).msgType,
  (get, set, msgType: MsgType) => {
    const currentSubmit = get(submitAtom);
    set(submitAtom, { ...currentSubmit, msgType });
  }
);

// 제출 상태 초기화
export const initSubmitStatusAtom = atom(null, (get, set) => {
  const currentSubmit = get(submitAtom);
  set(submitAtom, { ...currentSubmit, status: '' });
});

// ASYNC ATOMS
// 카테고리 아이템 비동기 처리
export const formCategoryItemAtom = atom(
  null,
  async (
    get,
    set,
    {
      method,
      itemInfo,
      table,
    }: {
      method: FetchMethod;
      itemInfo: MenuCategoryList | InsertMenuCategoryList | MenuCategoryList[];
      table: Table;
    }
  ) => {
    const msgType: MsgType = method === 'upsert' ? 'update' : method;
    set(submitAtom, { ...get(submitAtom), status: 'pending', isSubmit: true, alertType: 'category', msgType });

    const fetchResult = await fetchCategoryMenu({ method, itemInfo, table });

    if (fetchResult === null) {
      const callCount = get(submitAtom).callCount + 1;
      const preventSubmit = callCount >= 5;
      set(submitAtom, {
        ...get(submitAtom),
        isSubmit: false,
        status: 'rejected',
        isError: preventSubmit,
        callCount,
      });
      return;
    }
    set(submitAtom, { ...get(submitAtom), status: 'fulfilled', callCount: 0, isSubmit: false });
  }
);

// 메뉴 아이템 비동기 처리
export const formMenuItemAtom = atom(
  null,
  async (
    get,
    set,
    {
      method,
      itemInfo,
      table,
      file,
      adminId,
    }: {
      method: FetchMethod;
      itemInfo: MenuList;
      table: Table;
      file: FileBody;
      adminId: AdminId;
    }
  ) => {
    set(submitAtom, { ...get(submitAtom), status: 'pending', isSubmit: true, alertType: 'menu', msgType: method });

    const imgPath = createImgPath({ method, file, itemInfo, adminId });
    const imgResult = await fetchMenuImage({ method, file, imgPath });
    const fetchResult = await fetchMenuItem({ method, itemInfo, table });

    if (imgResult === null || fetchResult === null) {
      const callCount = get(submitAtom).callCount + 1;
      const preventSubmit = callCount >= 5;
      set(submitAtom, {
        ...get(submitAtom),
        isSubmit: false,
        status: 'rejected',
        isError: preventSubmit,
        callCount,
      });
      return;
    }
    set(submitAtom, { ...get(submitAtom), status: 'fulfilled', callCount: 0, isSubmit: false });
  }
);

// 주문 목록 상태 비동기 처리
export const orderListStatusAtom = atom(
  null,
  async (get, set, { method, data }: { method: FetchMethod; data: AllOrderList }) => {
    set(submitAtom, { ...get(submitAtom), status: 'pending', isSubmit: true, alertType: 'list' });

    const fetchResult = await fetchOrderList(method, data);

    if (fetchResult === null) {
      const callCount = get(submitAtom).callCount + 1;
      const preventSubmit = callCount >= 5;
      set(submitAtom, {
        ...get(submitAtom),
        isSubmit: false,
        status: 'rejected',
        isError: preventSubmit,
        callCount,
      });
      return;
    }
    set(submitAtom, { ...get(submitAtom), status: 'fulfilled', callCount: 0, isSubmit: false });
  }
);

// 테이블 목록 데이터 비동기 처리
export const tableListDataAtom = atom(
  null,
  async (get, set, { method, dataArr }: { method: FetchMethod; dataArr: TableDataArr<FetchMethod> }) => {
    set(submitAtom, { ...get(submitAtom), status: 'pending', isSubmit: true, alertType: 'list', msgType: method });

    const fetchResult = await fetchTableList(method, dataArr);

    if (fetchResult === null) {
      const callCount = get(submitAtom).callCount + 1;
      const preventSubmit = callCount >= 5;
      set(submitAtom, {
        ...get(submitAtom),
        isSubmit: false,
        status: 'rejected',
        isError: preventSubmit,
        callCount,
      });
      return;
    }
    set(submitAtom, { ...get(submitAtom), status: 'fulfilled', callCount: 0, isSubmit: false });
  }
);

// 알림 메시지 업데이트 비동기 처리
export const updateAlertMsgAtom = atom(null, async (get, set, { method, id }: { method: FetchMethod; id: string }) => {
  const fetchResult = await fetchTableRequestList(method, id);

  if (fetchResult === null) {
    const callCount = get(submitAtom).callCount + 1;
    const preventSubmit = callCount >= 5;
    set(submitAtom, {
      ...get(submitAtom),
      isSubmit: false,
      status: 'rejected',
      isError: preventSubmit,
      callCount,
    });
    return;
  }
});
