import { Tables } from '../../../database.types';

import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

export type Item = Tables<'qr-order-menu'>;
export type CategotyOrderList = Tables<'qr-order-allOrderList'>[] | DOMStringMap[];
export type SelectedTable = Tables<'qr-order-table-list'>;

type InitialState = {
  itemBox: {
    item: Item;
    list: CategotyOrderList;
    selectedTable: SelectedTable;
    selectedListId: SelectedTable['id'];
    clientTableList: Tables<'qr-order-table-list'>[];
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
    list: [],
    selectedTable: {
      id: '',
      init: {},
      tableNum: 0,
      order: [],
    },
    selectedListId: '',
    clientTableList: [],
  },
};

export interface UseItemSlice {
  itemBox: {
    item: Item;
    list: CategotyOrderList;
    selectedTable: SelectedTable;
    selectedListId: SelectedTable['id'];
    clientTableList: Tables<'qr-order-table-list'>[];
  };
  resetItemState: () => void;
  // sortId? -> 오류 반환 왜?
  getItemInfo: ({ item, sortId }: { item: Item; sortId?: number }) => void;
  getListInfo: ({ list }: { list: CategotyOrderList }) => void;
  getSelectedListId: ({ selectedListId }: { selectedListId: string }) => void;
  getClientTableList: ({ clientTableList }: { clientTableList: Tables<'qr-order-table-list'>[] }) => void;
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
