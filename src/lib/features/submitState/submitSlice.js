import supabase from "@/lib/supabase/supabaseConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  status: '',
  type: '',
  callCount: 0,
}

export const fetchFormData = createAsyncThunk(
  'submitState/fetchFormData',
  async ({ method, itemInfo }) => {
    // method 분류
    switch (method) {
      case 'post': {
        let response = await supabase.from('qr-order-menu').update(itemInfo).eq('id', Number(itemInfo.id)).select();
        if (response.status !== 200) throw new Error(response.error.message)
        return response;
      }
      case 'delete': {
        let response = await supabase.from('qr-order-menu').delete().eq('id', Number(itemInfo.id));
        if (response.status !== 204) throw new Error(response.error.message)
        return response;
      }
    }
    return new Promise((res) => {
      setTimeout(() => res('OK'), 1000);
    })
  }
)

const submitSlice = createSlice({
  name: 'submitState',
  initialState,
  reducers: {
    resetSubmitState: () => {
      return initialState;
    },
    changeSubmitType: (state, action) => {
      const type = action.payload.type;
      return {
        ...state,
        type
      }
    }
  },
  extraReducers: ((builder) => {
    builder.addCase(fetchFormData.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        status: 'pending'
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
  })
})

export const { resetSubmitState, changeSubmitType } = submitSlice.actions;
export default submitSlice.reducer;