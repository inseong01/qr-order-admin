import fetchMenuItem from "@/lib/supabase/func/fetchMenuItem";
import fetchTableList from "../../supabase/func/fetchTableList";
import fetchTableRequestList from "../../supabase/func/fetchTableRequestList";
import fetchOrderList from "../../supabase/func/fetchOrderList";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  status: '',
  alertType: '',
  msgType: '',
  callCount: 0,
  isError: false
}

export const fetchFormData = createAsyncThunk(
  'submitState/fetchFormData',
  async ({ method, itemInfo, table }) => {
    const result = await fetchMenuItem({ method, itemInfo, table })
    if (result.error?.code) throw new Error(result.error.message)
    return result;
  }
)

export const fetchOrderListStatus = createAsyncThunk(
  'submitState/fetchOrderListState',
  async ({ method, data }) => {
    const result = await fetchOrderList(method, data)
    if (result.error?.code) throw new Error(result.error.message);
    return result;
  }
)

export const fetchTableListData = createAsyncThunk(
  'submitState/fetchTableListData',
  async ({ method, dataArr }) => {
    const result = await fetchTableList(method, dataArr)
    if (result.error?.code) throw new Error(result.error.message);
    return result;
  }
)

export const fetchUpdateAlertMsg = createAsyncThunk(
  'submitState/fetchUpdateAlertMsg',
  async ({ method, id }) => {
    const result = await fetchTableRequestList(method, id)
    return result;
  }
)

const submitSlice = createSlice({
  name: 'submitState',
  initialState,
  reducers: {
    resetSubmitState: () => {
      return initialState;
    },
    changeSubmitMsgType: (state, action) => {
      const msgType = action.payload.msgType;
      return {
        ...state,
        msgType
      }
    },
    changeSubmitState: (state, action) => {
      const isSubmit = action.payload.isSubmit;
      return {
        ...state,
        isSubmit
      }
    }
  },
  extraReducers: ((builder) => {
    // fetchFormData
    builder.addCase(fetchFormData.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
      }
    })
    builder.addCase(fetchFormData.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        callCount: 0,
        alertType: 'list',
      }
    })
    builder.addCase(fetchFormData.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      console.error(action.error.message)
      return {
        ...state,
        isSubmit: false,
        status: 'rejected',
        callCount,
        isError: preventSubmit,
        alertType: 'list',
      }
    })
    // fetchOrderListStatus
    builder.addCase(fetchOrderListStatus.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
      }
    })
    builder.addCase(fetchOrderListStatus.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        callCount: 0,
        alertType: 'list',
      }
    })
    builder.addCase(fetchOrderListStatus.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      console.error(action.error.message)
      return {
        ...state,
        isSubmit: false,
        status: 'rejected',
        callCount,
        alertType: 'list',
        isError: preventSubmit
      }
    })
    // fetchTableListData
    builder.addCase(fetchTableListData.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
      }
    })
    builder.addCase(fetchTableListData.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        callCount: 0,
        alertType: 'list',
      }
    })
    builder.addCase(fetchTableListData.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      console.error(action.error.message)
      return {
        ...state,
        isSubmit: false,
        status: 'rejected',
        callCount,
        alertType: 'list',
        isError: preventSubmit
      }
    })
    // fetchUpdateAlertMsg
    builder.addCase(fetchUpdateAlertMsg.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
      }
    })
    builder.addCase(fetchUpdateAlertMsg.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      console.error(action.error.message)
      return {
        ...state,
        isSubmit: false,
        status: 'rejected',
        callCount,
        alertType: 'list',
        isError: preventSubmit
      }
    })
  })
})

export const { resetSubmitState, changeSubmitMsgType, changeSubmitState } = submitSlice.actions;
export default submitSlice.reducer;