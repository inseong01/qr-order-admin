import fetchMenuItem from "@/lib/supabase/func/fetchMenuItem";
import fetchTableList from "../../supabase/func/fetchTableList";
import fetchTableRequestList from "../../supabase/func/fetchTableRequestList";
import fetchOrderList from "../../supabase/func/fetchOrderList";
import fetchMenuImage from "../../supabase/func/fetchMenuImage";
import createImgPath from "../../function/createImgPath";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  status: '',
  alertType: '',
  msgType: '',
  callCount: 0,
  isError: false
}

/* createAsyncThunk */
export const fetchFormMenuItem = createAsyncThunk(
  'submitState/fetchFormMenuItem',
  async ({ method, itemInfo, table, file, adminId }) => {
    // const menuInfo = { ...itemInfo };
    const imgPath = createImgPath({ method, file, itemInfo, adminId });
    const imgResult = await fetchMenuImage({ method, file, imgPath })
    const fetchResult = await fetchMenuItem({ method, itemInfo, table, imgPath })
    const result = !imgResult?.error && !fetchResult.error;
    return result;
  }
)

export const fetchFormCategoryItem = createAsyncThunk(
  'submitState/fetchFormCategoryItem',
  async ({ method, itemInfo, table }) => {
    console.log(itemInfo)
    const fetchResult = await fetchMenuItem({ method, itemInfo, table })
    const result = !fetchResult?.error
    return result;
  }
)

export const fetchOrderListStatus = createAsyncThunk(
  'submitState/fetchOrderListState',
  async ({ method, data }) => {
    const result = await fetchOrderList(method, data);
    return result;
  }
)

export const fetchTableListData = createAsyncThunk(
  'submitState/fetchTableListData',
  async ({ method, dataArr }) => {
    const result = await fetchTableList(method, dataArr);
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

/* createSlice */
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
    // fetchFormMenuItem
    builder.addCase(fetchFormMenuItem.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
        alertType: 'list',
      }
    })
    builder.addCase(fetchFormMenuItem.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        callCount: 0,
      }
    })
    builder.addCase(fetchFormMenuItem.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      console.error(action.error.message)
      return {
        ...state,
        isSubmit: false,
        status: 'rejected',
        callCount,
        isError: preventSubmit,
      }
    })
    // fetchOrderListStatus
    builder.addCase(fetchOrderListStatus.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
        alertType: 'list',
      }
    })
    builder.addCase(fetchOrderListStatus.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        callCount: 0,
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
        isError: preventSubmit
      }
    })
    // fetchTableListData
    builder.addCase(fetchTableListData.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
        alertType: 'list',
      }
    })
    builder.addCase(fetchTableListData.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        callCount: 0,
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
        isError: preventSubmit
      }
    })
    // fetchUpdateAlertMsg
    builder.addCase(fetchUpdateAlertMsg.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
        alertType: 'list',
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
        isError: preventSubmit
      }
    })
    // fetchFormCategoryItem
    builder.addCase(fetchFormCategoryItem.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending',
        alertType: 'list',
      }
    })
    builder.addCase(fetchFormCategoryItem.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        callCount: 0,
      }
    })
    builder.addCase(fetchFormCategoryItem.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      console.error(action.error.message)
      return {
        ...state,
        isSubmit: false,
        status: 'rejected',
        callCount,
        isError: preventSubmit
      }
    })
  })
})

export const { resetSubmitState, changeSubmitMsgType, changeSubmitState } = submitSlice.actions;
export default submitSlice.reducer;