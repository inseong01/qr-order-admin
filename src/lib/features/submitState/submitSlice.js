import fetchMenuItem from "@/lib/supabase/func/fetchMenuItem";
import updateOrderListStatus from "@/lib/supabase/func/updateOrderListStatus";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  status: '',
  alertType: '',
  callCount: 0,
}

export const fetchFormData = createAsyncThunk(
  'submitState/fetchFormData',
  async ({ method, itemInfo, table }) => {
    const result = await fetchMenuItem({ method, itemInfo, table })
    if (result.error?.code) throw new Error(response.error.message)
    return result;
  }
)

export const fetchOrderListStatus = createAsyncThunk(
  'submitState/fetchOrderListState',
  async ({ list, selectedItemId }) => {
    let result = await updateOrderListStatus(list, selectedItemId)
    if (result.error?.code) throw new Error(result.error.message);
    return result;
  }
)

export const fetchDeleteList = createAsyncThunk(
  'submitState/fetchDeleteList',
  async () => { }
)

const submitSlice = createSlice({
  name: 'submitState',
  initialState,
  reducers: {
    resetSubmitState: () => {
      return initialState;
    },
    changeSubmitType: (state, action) => {
      const table = action.payload.table;
      let alertType = '';

      switch (table) {
        case 'menu': {
          alertType = 'product';
          break;
        }
        case 'order': {
          alertType = 'confirm';
          break;
        }
        default: {
          alertType = 'list';
        }
      }
      return {
        ...state,
        alertType
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
        callCount: 0
      }
    })
    builder.addCase(fetchFormData.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      return {
        ...state,
        isSubmit: preventSubmit,
        status: 'rejected',
        callCount
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
        alertType: '',
      }
    })
    builder.addCase(fetchOrderListStatus.rejected, (state, action) => {
      const callCount = state.callCount + 1;
      const preventSubmit = callCount >= 5 ? true : false;
      return {
        ...state,
        isSubmit: preventSubmit,
        status: 'rejected',
        callCount,
        alertType: 'list',
      }
    })
  })
})

export const { resetSubmitState, changeSubmitType, changeSubmitState } = submitSlice.actions;
export default submitSlice.reducer;