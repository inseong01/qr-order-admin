import { devtools } from 'zustand/middleware';
import { UseAlertSlice, useAlertSlice } from './useAlertSlice';
import { UseWidgetSlice, useWidgetSlice } from './useWidgetSlice';
import { UseCategorySlice, useCategorySlice } from './useCategorySlice';
import { UseItemSlice, useItemSlice } from './useItemSlice';
import { UseKonvaSlice, useKonvaSlice } from './useKonvaSlice';
import { UseModalSlice, useModalSlice } from './useModalSlice';
import { UseTabSlice, useTabSlice } from './useTabSlice';
import { UseSubmitSlice, useSubmitSlice } from './useSubmitSlice';
import { UseFetchSlice, useFetchSlice } from './useFetchSlice';
import { UseWindowSlice, useWindowSlice } from './useWindowSlice';

import { create } from 'zustand';

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
