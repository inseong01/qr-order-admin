import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrderList: {
    trigger: false
  },
  tableRequestList: {
    trigger: false,
    isOn: true
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
    },
    setTableRequestListAlertOn: (state) => {
      const isOn = !(state.tableRequestList.isOn)
      return {
        ...state,
        tableRequestList: {
          isOn
        }
      }
    }
  }
})

export const { setAllOrderListTrigger, setTableRequestListTrigger, setTableRequestListAlertOn } = realtimeSlice.actions;
export default realtimeSlice.reducer;