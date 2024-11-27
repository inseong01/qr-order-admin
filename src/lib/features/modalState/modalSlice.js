import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: '',
  item: {
    name: '',
    price: 0,
    description: '',
  }
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
    getItemInfo: (state, action) => {
      const { name, price, description } = action.payload.list
      return {
        ...state,
        item: {
          name,
          price,
          description
        }
      }
    },
    resetItemInfo: (state) => {
      return {
        ...state,
        item: {
          name: '',
          price: 0,
          description: ''
        }
      }
    }
  }
})

export const { resetModalState, changeModalState, getItemInfo, resetItemInfo } = modalSlice.actions;
export default modalSlice.reducer;