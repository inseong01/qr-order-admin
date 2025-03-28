import { StateCreator } from 'zustand';

export type EditType = 'insert' | 'update' | 'delete' | '';

type InitialState = {
  konva: {
    type: EditType;
    isAble: boolean;
    isEditing: boolean;
    isEditEnd: boolean;
    target: {
      id: Array<string>;
    };
  };
};

const initialState: InitialState = {
  konva: {
    type: '',
    isAble: false,
    isEditing: false,
    isEditEnd: false,
    target: {
      id: [],
    },
  },
};

export interface UseKonvaSlice {
  konva: {
    type: EditType;
    isAble: boolean;
    isEditing: boolean;
    isEditEnd: boolean;
    target: {
      id: Array<string>;
    };
  };
  resetKonvaState: () => void;
  changeKonvaEditState: ({ editType }: { editType: EditType }) => void;
  getEditKonvaTableId: ({ id }: { id: Array<string> }) => void;
  changeKonvaIsEditingState: ({ isEditing }: { isEditing: boolean }) => void;
}

export const useKonvaSlice: StateCreator<
  UseKonvaSlice,
  [['zustand/devtools', never]],
  [],
  UseKonvaSlice
> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        resetKonvaState: () => set(initialState, undefined, 'konva/resetKonvaState'),
        changeKonvaEditState: ({ editType }) =>
          set(
            () => {
              return {
                konva: {
                  ...initialState.konva,
                  type: editType,
                  isAble: true,
                  isEditing: editType === 'insert' && true,
                },
              };
            },
            undefined,
            'konva/changeKonvaEditState'
          ),
        getEditKonvaTableId: ({ id }) =>
          set(
            (state) => {
              return {
                konva: {
                  ...state.konva,
                  target: {
                    id,
                  },
                },
              };
            },
            undefined,
            'konva/getEditKonvaTableId'
          ),
        changeKonvaIsEditingState: ({ isEditing }) =>
          set(
            (state) => {
              return {
                konva: {
                  ...state.konva,
                  isEditing,
                },
              };
            },
            undefined,
            'konva/changeKonvaIsEditingState'
          ),
      })
    : (set) => ({
        ...initialState,
        resetKonvaState: () => set(initialState),
        changeKonvaEditState: ({ editType }) =>
          set(() => {
            return {
              konva: {
                ...initialState.konva,
                type: editType,
                isAble: true,
                isEditing: editType === 'insert' && true,
              },
            };
          }),
        getEditKonvaTableId: ({ id }) =>
          set((state) => {
            return {
              konva: {
                ...state.konva,
                target: {
                  id,
                },
              },
            };
          }),
        changeKonvaIsEditingState: ({ isEditing }) =>
          set((state) => {
            return {
              konva: {
                ...state.konva,
                isEditing,
              },
            };
          }),
      });
