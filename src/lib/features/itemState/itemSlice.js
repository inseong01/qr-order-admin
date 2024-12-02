import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {
    // id: null,
    name: '',
    price: 0,
    sort: '',
    description: '',
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