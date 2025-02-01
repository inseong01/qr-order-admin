import { v4 as uuidv4 } from 'uuid';

const initialState = {
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
      id: ''
    },
    selectedTable: {
      id: "",
      init: {},
      tableName: "",
      orderList: []
    },
    selectedListId: '',
    clientTableList: []
  }
}

export const useItemSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    resetItemState: () => set(initialState, undefined, 'itemBox/resetItemState'),
    getItemInfo: ({ item, sortId }) => set((state) => {
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
              sortId
            }
          }
        }
      }
      // item 있는 상품 수정 경우
      return {
        itemBox: {
          ...state.itemBox,
          item
        }
      }
    }, undefined, 'itemBox/getItemInfo'),
    getListInfo: ({ list }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          list
        }
      }
    }, undefined, 'itemBox/getListInfo'),
    getSelectedListId: ({ selectedListId }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          selectedListId
        }
      }
    }, undefined, 'itemBox/getSelectedListId'),
    getClientTableList: ({ clientTableList }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          clientTableList
        }
      }
    }, undefined, 'itemBox/getClientTableList'),
    selectTable: ({ selectedTable }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          selectedTable
        }
      }
    }, undefined, 'itemBox/selectTable')
  }) :
  (set) => ({
    ...initialState,
    resetItemState: () => set(initialState),
    getItemInfo: ({ item, sortId }) => set((state) => {
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
              sortId
            }
          }
        }
      }
      // item 있는 상품 수정 경우
      return {
        itemBox: {
          ...state.itemBox,
          item
        }
      }
    }),
    getListInfo: ({ list }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          list
        }
      }
    }),
    getSelectedListId: ({ selectedListId }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          selectedListId
        }
      }
    }),
    getClientTableList: ({ clientTableList }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          clientTableList
        }
      }
    }),
    selectTable: ({ selectedTable }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          selectedTable
        }
      }
    })
  })