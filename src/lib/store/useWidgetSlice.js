const initialState = {
  widget: {
    isOpen: false,
    // 위젯 하위 항목
    openOptionList: {
      1: false,
      2: false,
    },
    // 아이콘 변경
    isEdit: false,
  }
}

export const useWidgetSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    resetWidgetState: () => set(initialState, undefined, 'widget/resetWidgetState'),
    openCloseWidget: () => set((state) => {
      const isOpen = !state.widget.isOpen;
      return { widget: { ...initialState.widget, isOpen } }
    }, undefined, 'widget/openCloseWidget'),
    setWidgetEditState: (isEdit) => set((state) => ({ widget: { ...state.widget, isEdit } }), undefined, 'widget/setWidgetEditState'),
    setWidgetOptionListState: ({ optNum }) => set((state) => {
      const openOptionList = {
        ...initialState.widget.openOptionList,
        [optNum]: !state.widget.openOptionList[optNum]
      };
      return { widget: { ...state.widget, openOptionList } }
    }, undefined, 'widget/setWidgetOptionListState'),
  }) :
  (set) => ({
    ...initialState,
    resetWidgetState: () => set(initialState),
    openCloseWidget: () => set((state) => {
      const isOpen = !state.widget.isOpen;
      return { widget: { ...initialState.widget, isOpen } }
    }),
    setWidgetEditState: (isEdit) => set((state) => ({ widget: { ...state.widget, isEdit } })),
    setWidgetOptionListState: ({ optNum }) => set((state) => {
      const openOptionList = {
        ...initialState.widget.openOptionList,
        [optNum]: !state.widget.openOptionList[optNum]
      };
      return { widget: { ...state.widget, openOptionList } }
    }),
  })