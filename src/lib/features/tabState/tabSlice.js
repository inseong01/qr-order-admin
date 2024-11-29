import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: 'menu',
}

const tabSlice = createSlice({
  name: 'tabState',
  initialState,
  reducers: {
    changeTabState: ((state, action) => {
      const currentState = action.payload.state;
      let type = ''

      switch (currentState) {
        case '메뉴': {
          type = 'menu';
          break;
        }
        case '좌석': {
          type = 'table'
          break;
        }
        case '주문': {
          type = 'order';
          break;
        }
        default: {
          type = 'menu';
        }
      }

      return {
        ...state,
        state: type
      }
    })
  }
})

export const { changeTabState } = tabSlice.actions;
export default tabSlice.reducer;