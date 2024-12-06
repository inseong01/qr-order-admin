import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: 'add',
}

const modalSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    resetModalState: () => {
      return initialState;
    },
    changeModalState: (state, action) => {
      const type = action.payload.type;
      const isOpen = action.payload.isOpen;
      return {
        ...state,
        isOpen,
        type: !type ? state.type : type
      }
    },
  }
})

export const { resetModalState, changeModalState } = modalSlice.actions;
export default modalSlice.reducer;