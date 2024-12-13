import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrderList: {
    trigger: false
  },
  tableRequestList: {
    trigger: false,
  },
}

const realtimeSlice = createSlice({
  name: 'realtimeState',
  initialState,
  reducers: {
    setAllOrderListTrigger: (state, action) => {
      return {
        ...state,
        allOrderList: {
          ...state.allOrderList,
          trigger: !state.allOrderList.trigger
        }
      }
    },
    setTableRequestListTrigger: (state, action) => {
      return {
        ...state,
        tableRequestList: {
          ...state.tableRequestList,
          trigger: !state.tableRequestList.trigger
        }
      }
    }
  }
})

export const { setAllOrderListTrigger, setTableRequestListTrigger } = realtimeSlice.actions;
export default realtimeSlice.reducer;