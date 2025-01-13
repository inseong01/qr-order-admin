const initialState = {
  modal: {
    isOpen: false,
    type: 'insert',
  }
}

export const useModalSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    resetModalState: () => set(initialState, undefined, 'modal/resetModalState'),
    changeModalState: ({ type, isOpen }) => set((state) => {
      return {
        modal: {
          isOpen,
          type: !type ? state.modal.type : type
        }
      }
    }, undefined, 'modal/changeModalState'),
  }) :
  (set) => ({
    ...initialState,
    resetModalState: () => set(initialState),
    changeModalState: ({ type, isOpen }) => set((state) => {
      return {
        modal: {
          isOpen,
          type: !type ? state.modal.type : type
        }
      }
    }),
  })