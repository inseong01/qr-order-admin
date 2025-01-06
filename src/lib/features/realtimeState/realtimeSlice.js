import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableRequestList: {
    isOn: true
  },
}

const realtimeSlice = createSlice({
  name: 'realtimeState',
  initialState,
  reducers: {
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

export const { setTableRequestListAlertOn } = realtimeSlice.actions;
export default realtimeSlice.reducer;