const initialState = {
  submit: {
    isSubmit: false,
    status: '',
    alertType: '',
    msgType: '',
    callCount: 0,
    isError: false
  }
}

export const useSubmitSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    resetSubmitState: () => set(initialState, undefined, 'submit/resetSubmitState'),
    changeSubmitMsgType: ({ msgType }) => set((state) => {
      return {
        submit: {
          ...state.submit,
          msgType
        }
      }
    }, undefined, 'submit/changeSubmitMsgType'),
  }) :
  (set) => ({
    ...initialState,
    resetSubmitState: () => set(initialState),
    changeSubmitMsgType: ({ msgType }) => set((state) => {
      return {
        submit: {
          ...state.submit,
          msgType
        }
      }
    }),
  })