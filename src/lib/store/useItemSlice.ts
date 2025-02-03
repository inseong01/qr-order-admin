import { Tables } from '../../../database.types';

import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

export type Item = Tables<'qr-order-menu'>;
// export type Item = {
//   id: string;
//   name: string;
//   price: number;
//   sort: string;
//   sortId: number;
//   tag: string;
//   url: string;
// };

export type SelectedTable = {
  id: string;
  init: object;
  tableName: string;
  orderList: Array<object>;
};

type InitialState = {
  itemBox: {
    item: Item;
    list: {
      id: Tables<'qr-order-allOrderList'>['id'];
    };
    selectedTable: SelectedTable;
    selectedListId: string;
    clientTableList: Array<object>;
  };
};

const initialState: InitialState = {
  itemBox: {
    item: {
      id: '',
      name: '',
      price: 0,
      sort: '전체메뉴',
      sortId: 0,
      tag: '',
      url: '',
    },
    list: {
      id: '',
    },
    selectedTable: {
      id: '',
      init: {},
      tableName: '',
      orderList: [],
    },
    selectedListId: '',
    clientTableList: [],
  },
};

export interface UseItemSlice {
  itemBox: {
    item: Item;
    list: {
      id: string;
    };
    selectedTable: SelectedTable;
    selectedListId: string;
    clientTableList: Array<object>;
  };
  resetItemState: () => void;
  getItemInfo: ({ item, sortId }: { item: Item; sortId: number }) => void;
  getListInfo: ({ list }: { list: { id: string } }) => void;
  getSelectedListId: ({ selectedListId }: { selectedListId: string }) => void;
  getClientTableList: ({ clientTableList }: { clientTableList: Array<object> }) => void;
  selectTable: ({ selectedTable }: { selectedTable: SelectedTable }) => void;
}

export const useItemSlice: StateCreator<UseItemSlice, [['zustand/devtools', never]], [], UseItemSlice> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        resetItemState: () => set(initialState, undefined, 'itemBox/resetItemState'),
        getItemInfo: ({ item, sortId }) =>
          set(
            (state) => {
              // item 없는 상품 추가 경우
              if (!item) {
                // 사진 이름 저장으로 uuid 사용
                const id = uuidv4();
                return {
                  itemBox: {
                    ...state.itemBox,
                    item: {
                      ...initialState.itemBox.item,
                      id,
                      sortId,
                    },
                  },
                };
              }
              // item 있는 상품 수정 경우
              return {
                itemBox: {
                  ...state.itemBox,
                  item,
                },
              };
            },
            undefined,
            'itemBox/getItemInfo'
          ),
        getListInfo: ({ list }) =>
          set(
            (state) => {
              return {
                itemBox: {
                  ...state.itemBox,
                  list,
                },
              };
            },
            undefined,
            'itemBox/getListInfo'
          ),
        getSelectedListId: ({ selectedListId }) =>
          set(
            (state) => {
              return {
                itemBox: {
                  ...state.itemBox,
                  selectedListId,
                },
              };
            },
            undefined,
            'itemBox/getSelectedListId'
          ),
        getClientTableList: ({ clientTableList }) =>
          set(
            (state) => {
              return {
                itemBox: {
                  ...state.itemBox,
                  clientTableList,
                },
              };
            },
            undefined,
            'itemBox/getClientTableList'
          ),
        selectTable: ({ selectedTable }) =>
          set(
            (state) => {
              return {
                itemBox: {
                  ...state.itemBox,
                  selectedTable,
                },
              };
            },
            undefined,
            'itemBox/selectTable'
          ),
      })
    : (set) => ({
        ...initialState,
        resetItemState: () => set(initialState),
        getItemInfo: ({ item, sortId }) =>
          set((state) => {
            // item 없는 상품 추가 경우
            if (!item) {
              // 사진 이름 저장으로 uuid 사용
              const id = uuidv4();
              return {
                itemBox: {
                  ...state.itemBox,
                  item: {
                    ...initialState.itemBox.item,
                    id,
                    sortId,
                  },
                },
              };
            }
            // item 있는 상품 수정 경우
            return {
              itemBox: {
                ...state.itemBox,
                item,
              },
            };
          }),
        getListInfo: ({ list }) =>
          set((state) => {
            return {
              itemBox: {
                ...state.itemBox,
                list,
              },
            };
          }),
        getSelectedListId: ({ selectedListId }) =>
          set((state) => {
            return {
              itemBox: {
                ...state.itemBox,
                selectedListId,
              },
            };
          }),
        getClientTableList: ({ clientTableList }) =>
          set((state) => {
            return {
              itemBox: {
                ...state.itemBox,
                clientTableList,
              },
            };
          }),
        selectTable: ({ selectedTable }) =>
          set((state) => {
            return {
              itemBox: {
                ...state.itemBox,
                selectedTable,
              },
            };
          }),
      });
