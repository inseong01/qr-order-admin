import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  title: '전체메뉴',
}

const categorySlice = createSlice({
  name: 'categoryState',
  initialState,
  reducers: {
    resetCategoryState: () => {
      return initialState
    },
    changeCategoryId: (state, action) => {
      const id = action.payload.id;
      const title = !action.payload.title ? '' : action.payload.title;
      return {
        ...state,
        id,
        title,
      }
    }
  }
})

export const { resetCategoryState, changeCategoryId } = categorySlice.actions;
export default categorySlice.reducer;