import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: '',
  isAble: false,
  target: {
    id: ''
  }
}

const konvaSlice = createSlice({
  name: 'konvaState',
  initialState,
  reducers: {
    resetKonvaState: () => {
      return initialState
    },
    changeKonvaEditState: (state, action) => {
      const editType = action.payload.editType;
      const isAble = action.payload.isAble;
      return {
        ...initialState,
        type: editType,
        isAble
      }
    },
    getEditKonvaTableId: (state, action) => {
      const id = action.payload.id;
      return {
        ...state,
        target: {
          ...state.edit,
          id
        }
      }
    }
  }
})

export const { resetKonvaState, changeKonvaEditState, getEditKonvaTableId } = konvaSlice.actions;
export default konvaSlice.reducer;