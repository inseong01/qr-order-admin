import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  status: '',
  type: '',
}

export const fetchFormData = createAsyncThunk(
  'submitState/fetchFormData',
  async (item) => {
    console.log('submit data: ', item)
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
        status: 'fulfilled'
      }
    })
  })
})

export const { resetSubmitState, changeSubmitType } = submitSlice.actions;
export default submitSlice.reducer;