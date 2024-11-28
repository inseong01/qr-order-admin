import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: 1,
  title: '',
}

const categorySlice = createSlice({
  name: 'categoryState',
  initialState,
  reducers: {
    resetCategoryState: () => {
      return initialState
    },
    changeCategoryKey: (state, action) => {
      const key = action.payload.key;
      const title = !action.payload.title ? '' : action.payload.title;
      return {
        ...state,
        key,
        title,
      }
    }
  }
})

export const { resetCategoryState, changeCategoryKey } = categorySlice.actions;
export default categorySlice.reducer;