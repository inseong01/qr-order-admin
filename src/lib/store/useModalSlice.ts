import { StateCreator } from 'zustand';

type InitialState = {
  modal: {
    isOpen: boolean;
    type: string;
  };
};
const initialState: InitialState = {
  modal: {
    isOpen: false,
    type: 'insert',
  },
};

export interface UseModalSlice {
  modal: {
    isOpen: boolean;
    type: string;
  };
  resetModalState: () => void;
  changeModalState: ({ type, isOpen }: { type: string; isOpen: boolean }) => void;
}

export const useModalSlice: StateCreator<UseModalSlice, [['zustand/devtools', never]], [], UseModalSlice> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        resetModalState: () => set(initialState, undefined, 'modal/resetModalState'),
        changeModalState: ({ type, isOpen }) =>
          set(
            (state) => {
              return {
                modal: {
                  isOpen,
                  type: !type ? state.modal.type : type,
                },
              };
            },
            undefined,
            'modal/changeModalState'
          ),
      })
    : (set) => ({
        ...initialState,
        resetModalState: () => set(initialState),
        changeModalState: ({ type, isOpen }) =>
          set((state) => {
            return {
              modal: {
                isOpen,
                type: !type ? state.modal.type : type,
              },
            };
          }),
      });
