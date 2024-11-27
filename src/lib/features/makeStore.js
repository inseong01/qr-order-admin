import { configureStore } from "@reduxjs/toolkit";
import tabSliceReducer from '@/lib/features/tabState/tabSlice.js'
import modalSliceReducer from '@/lib/features/modalState/modalSlice.js'
import submitSliceReducer from '@/lib/features/submitState/submitSlice.js'

export default function makeStore() {
  return configureStore({
    reducer: {
      tabState: tabSliceReducer,
      modalState: modalSliceReducer,
      submitState: submitSliceReducer,
    }
  })
}