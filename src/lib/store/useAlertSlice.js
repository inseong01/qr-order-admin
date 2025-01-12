const initialState = {
  alert: {
    isOn: true
  }
}

export const useAlertSlice = (set) => ({
  ...initialState,
  toggleRequestAlert: () => set((state) => {
    const isOn = !state.alert.isOn;
    return { alert: { ...state.alert, isOn } }
  })
})