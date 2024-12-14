import { configureStore } from "@reduxjs/toolkit";
import tabSliceReducer from '@/lib/features/tabState/tabSlice.js'
import modalSliceReducer from '@/lib/features/modalState/modalSlice.js'
import submitSliceReducer from '@/lib/features/submitState/submitSlice.js'
import itemSliceReducer from '@/lib/features/itemState/itemSlice.js'
import categorySliceReducer from '@/lib/features/categoryState/categorySlice.js'
import konvaSliceReducer from '@/lib/features/konvaState/konvaSlice.js'
import realtimeSliceReducer from '@/lib/features/realtimeState/realtimeSlice.js'
import widgetSliceReducer from '@/lib/features/widgetState/widgetSlice.js'

export default function makeStore() {
  return configureStore({
    reducer: {
      tabState: tabSliceReducer,
      modalState: modalSliceReducer,
      submitState: submitSliceReducer,
      itemState: itemSliceReducer,
      categoryState: categorySliceReducer,
      konvaState: konvaSliceReducer,
      realtimeState: realtimeSliceReducer,
      widgetState: widgetSliceReducer,
    }
  })
}