const initialState = {
  alert: {
    isOn: true
  }
}

export const useAlertSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    toggleRequestAlert: () => set((state) => {
      const isOn = !state.alert.isOn;
      return { alert: { ...state.alert, isOn } }
    }, undefined, 'alert/toggleRequestAlert')
  }) :
  (set) => ({
    ...initialState,
    toggleRequestAlert: () => set((state) => {
      const isOn = !state.alert.isOn;
      return { alert: { ...state.alert, isOn } }
    })
  })