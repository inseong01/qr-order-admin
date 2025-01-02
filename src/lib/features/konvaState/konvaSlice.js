import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: '',
  isAble: false,
  isEditing: false,
  target: {
    id: []
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
      return {
        ...initialState,
        type: editType,
        isAble: true,
        isEditing: editType === 'create' && true
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
    },
    changeKonvaIsEditingState: (state, action) => {
      const isEditing = action.payload.isEditing;
      return {
        ...state,
        isEditing
      }
    }
  }
})

export const { resetKonvaState, changeKonvaEditState, getEditKonvaTableId, changeKonvaIsEditingState } = konvaSlice.actions;
export default konvaSlice.reducer;