const initialState = {
  submit: {
    isSubmit: false,
    status: '',
    // status: 'initial',
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
    changeSubmitStatus: ({ status }) => set((state) => {
      return {
        submit: {
          ...state.submit,
          status
        }
      }
    }, undefined, 'submit/changeSubmitStatus'),
    changeSubmitState: ({ isSubmit }) => set((state) => {
      return {
        submit: {
          ...state.submit,
          isSubmit,
        }
      }
    }, undefined, 'submit/changeSubmitState')
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
    changeSubmitStatus: ({ status }) => set((state) => {
      return {
        submit: {
          ...state.submit,
          status
        }
      }
    }),
    changeSubmitState: ({ isSubmit }) => set((state) => {
      return {
        ...state,
        isSubmit
      }
    })
  })