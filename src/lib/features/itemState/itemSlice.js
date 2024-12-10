import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {
    // id: null,
    name: '',
    price: 0,
    sort: '',
    description: '',
  },
  list: {
    id: ''
  },
  selectedListId: '',
  clientTableList: []
}

const itemSlice = createSlice({
  name: 'itmeState',
  initialState,
  reducers: {
    resetItemState: () => {
      return initialState;
    },
    getItemInfo: (state, action) => {
      const item = action.payload.item;
      return {
        ...state,
        item
      }
    },
    getOrderListInfo: (state, action) => {
      const list = action.payload.list;
      return {
        ...state,
        list
      }
    },
    getSelectedListId: (state, action) => {
      const selectedListId = action.payload.selectedListId
      return {
        ...state,
        selectedListId
      }
    },
    getClientTableList: (state, action) => {
      const clientTableList = action.payload.clientTableList;
      return {
        ...state,
        clientTableList
      }
    }
  }
})

export const { resetItemState, getItemInfo, getOrderListInfo, getSelectedListId, getClientTableList } = itemSlice.actions;
export default itemSlice.reducer;