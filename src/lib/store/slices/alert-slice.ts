import { StateCreator } from 'zustand';

type InitialState = {
  alert: {
    isOn: boolean;
  };
};

const initialState: InitialState = {
  alert: {
    isOn: true,
  },
};

export interface UseAlertSlice {
  alert: {
    isOn: boolean;
  };
  toggleRequestAlert: () => void;
}

export const useAlertSlice: StateCreator<UseAlertSlice, [['zustand/devtools', never]], [], UseAlertSlice> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        toggleRequestAlert: () =>
          set(
            (state) => {
              const isOn = !state.alert.isOn;
              return { alert: { ...state.alert, isOn } };
            },
            undefined,
            'alert/toggleRequestAlert'
          ),
      })
    : (set) => ({
        ...initialState,
        toggleRequestAlert: () =>
          set((state) => {
            const isOn = !state.alert.isOn;
            return { alert: { ...state.alert, isOn } };
          }),
      });
