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
      return {
        ...state,
        state: currentState
      }
    })
  }
})

export const { changeTabState } = tabSlice.actions;
export default tabSlice.reducer;