import { devtools } from "zustand/middleware";
import { useAlertSlice } from "./useAlertSlice";
import { useCategorySlice } from "./useCategorySlice";
import { useItemSlice } from "./useItemSlice";
import { useKonvaSlice } from "./useKonvaSlice";
import { useModalSlice } from "./useModalSlice";
import { useTabSlice } from "./useTabSlice";
import { useWidgetSlice } from "./useWidgetSlice";
import { useSubmitSlice } from "./useSubmitSlice";
import { useFetchSlice } from "./useFetchSlice";

import { create } from "zustand";

export const useBoundStore =
  process.env.NODE_ENV === 'development' ?
    create()(devtools((...a) => ({
      ...useWidgetSlice(...a),
      ...useAlertSlice(...a),
      ...useTabSlice(...a),
      ...useCategorySlice(...a),
      ...useModalSlice(...a),
      ...useItemSlice(...a),
      ...useKonvaSlice(...a),
      ...useSubmitSlice(...a),
      ...useFetchSlice(...a)
    }))) :
    create((...a) => ({
      ...useWidgetSlice(...a),
      ...useAlertSlice(...a),
      ...useTabSlice(...a),
      ...useCategorySlice(...a),
      ...useModalSlice(...a),
      ...useItemSlice(...a),
      ...useKonvaSlice(...a),
      ...useSubmitSlice(...a),
      ...useFetchSlice(...a)
    }))