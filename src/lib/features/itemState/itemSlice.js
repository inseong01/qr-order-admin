import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {
    name: '',
    price: 0,
    description: ''
  }
}

const itemSlice = createSlice({
  name: 'itmeState',
  initialState,
  reducers: {
    resetItemState: () => {
      return initialState;
    },
    getItemInfo: (state, action) => {
      const item = action.payload.item;
      return {
        ...state,
        item
      }
    }
  }
})

export const { resetItemState, getItemInfo } = itemSlice.actions;
export default itemSlice.reducer;