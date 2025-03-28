import { StateCreator } from 'zustand';

export type ModalType =
  | 'info'
  | 'insert'
  | 'update'
  | 'upsert'
  | 'update-category'
  | 'insert-category';

type InitialState = {
  modal: {
    isOpen: boolean;
    type: ModalType;
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
    type: ModalType;
  };
  resetModalState: () => void;
  changeModalState: ({ type, isOpen }: { type?: ModalType; isOpen: boolean }) => void;
}

export const useModalSlice: StateCreator<
  UseModalSlice,
  [['zustand/devtools', never]],
  [],
  UseModalSlice
> =
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
