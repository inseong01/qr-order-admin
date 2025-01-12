import { useAlertSlice } from "./useAlertSlice";
import { useCategorySlice } from "./useCategorySlice";
import { useTabSlice } from "./useTabSlice";
import { useWidgetSlice } from "./useWidgetSlice";

import { create } from "zustand";

export const useBoundStore = create((...a) => ({
  ...useWidgetSlice(...a),
  ...useAlertSlice(...a),
  ...useTabSlice(...a),
  ...useCategorySlice(...a),
}))