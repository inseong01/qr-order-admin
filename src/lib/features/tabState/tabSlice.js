import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  title: 'menu',
}

const tabSlice = createSlice({
  name: 'tabState',
  initialState,
  reducers: {
    changeTabState: ((state, action) => {
      const currentTitle = action.payload.title;
      const id = action.payload.id;
      let title = ''

      switch (currentTitle) {
        case '메뉴': {
          title = 'menu';
          break;
        }
        case '좌석': {
          title = 'table'
          break;
        }
        case '주문': {
          title = 'order';
          break;
        }
        default: {
          title = 'menu';
        }
      }

      return {
        ...state,
        title,
        id
      }
    })
  }
})

export const { changeTabState } = tabSlice.actions;
export default tabSlice.reducer;