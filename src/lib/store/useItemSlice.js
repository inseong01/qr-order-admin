// import { v4 as uuidv4 } from 'uuid'

const initialState = {
  itemBox: {
    item: {
      // db에서 생성되도록
      // id: '',
      name: '',
      price: 0,
      sort: '',
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
    resetItemState: () => set(initialState, undefined, 'item/resetItemState'),
    getItemInfo: ({ item, sort }) => set((state) => {
      // const id = uuidv4();
      // item 없는 상품 추가 경우
      if (!item) {
        return {
          itemBox: {
            ...state.itemBox,
            item: {
              ...initialState.itemBox.item,
              // id,
              sort
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
    }, undefined, 'item/getItemInfo'),
    getListInfo: ({ list }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          list
        }
      }
    }, undefined, 'item/getListInfo'),
    getSelectedListId: ({ selectedListId }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          selectedListId
        }
      }
    }, undefined, 'item/getSelectedListId'),
    getClientTableList: ({ clientTableList }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          clientTableList
        }
      }
    }, undefined, 'item/getClientTableList'),
    selectTable: ({ selectedTable }) => set((state) => {
      return {
        itemBox: {
          ...state.itemBox,
          selectedTable
        }
      }
    }, undefined, 'item/selectTable')
  }) :
  (set) => ({
    ...initialState,
    resetItemState: () => set(initialState),
    getItemInfo: ({ item, sort }) => set((state) => {
      // const id = uuidv4();
      // item 없는 상품 추가 경우
      if (!item) {
        return {
          itemBox: {
            ...state.itemBox,
            item: {
              ...initialState.itemBox.item,
              // id,
              sort
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