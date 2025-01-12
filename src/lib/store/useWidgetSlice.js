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

export const useWidgetSlice = (set) => ({
  ...initialState,
  resetWidgetState: () => set(() => initialState),
  openCloseWidget: () => set((state) => {
    const isOpen = !state.widget.isOpen;
    return { widget: { ...state.widget, isOpen } }
  }),
  setWidgetEditState: (isEdit) => set((state) => ({ widget: { ...state.widget, isEdit } })),
  setWidgetOptionListState: (id) => set((state) => {
    const openOptionList = {
      ...initialState.widget.openOptionList,
      [id]: !state.widget.openOptionList[id]
    };
    return { widget: { ...state.widget, openOptionList } }
  }),
})