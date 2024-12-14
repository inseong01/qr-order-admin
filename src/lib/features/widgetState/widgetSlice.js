import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWidgetOpen: false,
  // 위젯 하위 항목
  isWidgetListOpen: {
    firstOption: false,
    secondOption: false,
    thirdOption: false,
  },
  isEdit: false,
}

const widgetSlice = createSlice({
  name: 'widgetState',
  initialState,
  reducers: {
    resetWidgetState: () => {
      return initialState
    },
    setWidgetState: (state, action) => {
      const isWidgetOpen = action.payload.isOpen;
      return {
        ...initialState,
        isWidgetOpen
      }
    },
    setWidgeListState: (state, action) => {
      let optName = '';
      const optNum = action.payload.optNum;

      switch (optNum) {
        case 1: {
          optName = 'firstOption'
          break;
        }
        case 2: {
          optName = 'secondOption'
          break;
        }
        case 3: {
          optName = 'thirdOption'
          break;
        }
        default: {
          console.error(`"${optNum}" optNum is not defined!`);
        }
      }

      return {
        ...state,
        isWidgetListOpen: {
          ...initialState.isWidgetListOpen,
          [optName]: !state.isWidgetListOpen[optName],
        }
      }
    },
    setWidgetEditState: (state, action) => {
      const isEdit = action.payload.isEdit;
      return {
        ...state,
        isEdit
      }
    }
  }
})

export const { resetWidgetState, setWidgetState, setWidgeListState, setWidgetEditState } = widgetSlice.actions;
export default widgetSlice.reducer;