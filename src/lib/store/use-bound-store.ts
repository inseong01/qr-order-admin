import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { useWidgetSlice, UseWidgetSlice } from './slices/widget-slice';
import { useAlertSlice, UseAlertSlice } from './slices/alert-slice';
import { useCategorySlice, UseCategorySlice } from './slices/category-slice';
import { useItemSlice, UseItemSlice } from './slices/item-slice';
import { useKonvaSlice, UseKonvaSlice } from './slices/konva-slice';
import { useModalSlice, UseModalSlice } from './slices/modal-slice';
import { useTabSlice, UseTabSlice } from './slices/tab-slice';
import { useSubmitSlice, UseSubmitSlice } from './slices/submit-slice';
import { useFetchSlice, UseFetchSlice } from './slices/fetch-slice';
import { useWindowSlice, UseWindowSlice } from './slices/window-slice';

export type UseBoundStore = UseWidgetSlice &
  UseAlertSlice &
  UseCategorySlice &
  UseItemSlice &
  UseKonvaSlice &
  UseModalSlice &
  UseTabSlice &
  UseSubmitSlice &
  UseFetchSlice &
  UseWindowSlice;

export const useBoundStore =
  import.meta.env.MODE === 'development'
    ? create<UseBoundStore>()(
        devtools((...a) => ({
          ...useWidgetSlice(...a),
          ...useAlertSlice(...a),
          ...useTabSlice(...a),
          ...useCategorySlice(...a),
          ...useModalSlice(...a),
          ...useItemSlice(...a),
          ...useKonvaSlice(...a),
          ...useSubmitSlice(...a),
          ...useFetchSlice(...a),
          ...useWindowSlice(...a),
        }))
      )
    : create<UseBoundStore>((...a) => ({
        ...useWidgetSlice(...a),
        ...useAlertSlice(...a),
        ...useTabSlice(...a),
        ...useCategorySlice(...a),
        ...useModalSlice(...a),
        ...useItemSlice(...a),
        ...useKonvaSlice(...a),
        ...useSubmitSlice(...a),
        ...useFetchSlice(...a),
        ...useWindowSlice(...a),
      }));
