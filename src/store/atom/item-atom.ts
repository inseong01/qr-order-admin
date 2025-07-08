import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { AllOrderList, MenuCategoryList, MenuList, TableList } from '../../../types/common';

//- zustand
// type InitialState = {
//   itemBox: {
//     item: MenuList;
//     list: CategoryAndOrderList;
//     selectedTable: TableList;
//     selectedListId: TableList['id'];
//     clientTableList: TableList[];
//   };
// };

export type CategoryAndOrderList =
  | AllOrderList[]
  | DOMStringMap[]
  | MenuCategoryList[]
  | MenuCategoryList
  | AllOrderList;

type ItemBox = {
  item: MenuList;
  list: CategoryAndOrderList;
  selectedTable: TableList;
  selectedListId: TableList['id'];
  clientTableList: TableList[];
};

const initialItemBox: ItemBox = {
  item: {
    id: '',
    name: '',
    price: 0,
    sort: '전체메뉴',
    sortId: 0,
    tag: '',
    url: '',
  },
  list: [],
  selectedTable: {
    id: '',
    init: {},
    tableNum: 0,
    order: [],
  },
  selectedListId: '',
  clientTableList: [],
};

//- jotai
// 아이템 박스 상태
export const itemBoxAtom = atom<ItemBox>(initialItemBox);

// 아이템 박스 상태 초기화
export const itemBoxAtomWithReset = atom(
  (get) => get(itemBoxAtom),
  (_, set) => {
    set(itemBoxAtom, initialItemBox);
  }
);

// 아이템 정보 업데이트
export const itemInfoAtom = atom(
  (get) => get(itemBoxAtom).item,
  (get, set, { item, sortId }: { item: MenuList; sortId: number }) => {
    const currentItemBox = get(itemBoxAtom);
    if (!item) {
      const id = uuidv4();
      set(itemBoxAtom, {
        ...currentItemBox,
        item: {
          ...initialItemBox.item,
          id,
          sortId,
        },
      });
    } else {
      set(itemBoxAtom, {
        ...currentItemBox,
        item,
      });
    }
  }
);

// 리스트 정보 업데이트
export const listInfoAtom = atom(
  (get) => get(itemBoxAtom).list,
  (get, set, list: CategoryAndOrderList) => {
    const currentItemBox = get(itemBoxAtom);
    set(itemBoxAtom, { ...currentItemBox, list });
  }
);

// 선택된 리스트 아이디 업데이트
export const selectedListIdAtom = atom(
  (get) => get(itemBoxAtom).selectedListId,
  (get, set, selectedListId: string) => {
    const currentItemBox = get(itemBoxAtom);
    set(itemBoxAtom, { ...currentItemBox, selectedListId });
  }
);

// 클라이언트 테이블 리스트 업데이트
export const clientTableListAtom = atom(
  (get) => get(itemBoxAtom).clientTableList,
  (get, set, clientTableList: TableList[]) => {
    const currentItemBox = get(itemBoxAtom);
    set(itemBoxAtom, { ...currentItemBox, clientTableList });
  }
);

// 선택된 테이블 업데이트
export const selectedTableAtom = atom(
  (get) => get(itemBoxAtom).selectedTable,
  (get, set, selectedTable: TableList) => {
    const currentItemBox = get(itemBoxAtom);
    set(itemBoxAtom, { ...currentItemBox, selectedTable });
  }
);
