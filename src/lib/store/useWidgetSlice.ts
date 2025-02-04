import { StateCreator } from 'zustand';

// opt 추가 시 숫자(옵션 번호) 할당
export type OptNum = 1 | 2;

type InitialState = {
  widget: {
    isOpen: boolean;
    openOptionList: {
      1: boolean;
      2: boolean;
    };
    isEdit: boolean;
  };
};

const initialState: InitialState = {
  widget: {
    isOpen: false,
    // 위젯 하위 항목
    openOptionList: {
      1: false,
      2: false,
    },
    // 아이콘 변경
    isEdit: false,
  },
};

export interface UseWidgetSlice {
  widget: {
    isOpen: boolean;
    openOptionList: {
      1: boolean;
      2: boolean;
    };
    isEdit: boolean;
  };
  resetWidgetState: () => void;
  openCloseWidget: () => void;
  setWidgetEditState: (isEdit: boolean) => void;
  setWidgetOptionListState: ({ optNum }: { optNum: OptNum }) => void;
}

export const useWidgetSlice: StateCreator<UseWidgetSlice, [['zustand/devtools', never]], [], UseWidgetSlice> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        resetWidgetState: () => set(initialState, undefined, 'widget/resetWidgetState'),
        openCloseWidget: () =>
          set(
            (state) => {
              const isOpen = !state.widget.isOpen;
              return { widget: { ...initialState.widget, isOpen } };
            },
            undefined,
            'widget/openCloseWidget'
          ),
        setWidgetEditState: (isEdit) =>
          set((state) => ({ widget: { ...state.widget, isEdit } }), undefined, 'widget/setWidgetEditState'),
        setWidgetOptionListState: ({ optNum }) =>
          set(
            (state) => {
              const openOptionList = {
                ...initialState.widget.openOptionList,
                [optNum]: !state.widget.openOptionList[optNum],
              };
              return { widget: { ...state.widget, openOptionList } };
            },
            undefined,
            'widget/setWidgetOptionListState'
          ),
      })
    : (set) => ({
        ...initialState,
        resetWidgetState: () => set(initialState),
        openCloseWidget: () =>
          set((state) => {
            const isOpen = !state.widget.isOpen;
            return { widget: { ...initialState.widget, isOpen } };
          }),
        setWidgetEditState: (isEdit) => set((state) => ({ widget: { ...state.widget, isEdit } })),
        setWidgetOptionListState: ({ optNum }) =>
          set((state) => {
            const openOptionList = {
              ...initialState.widget.openOptionList,
              [optNum]: !state.widget.openOptionList[optNum],
            };
            return { widget: { ...state.widget, openOptionList } };
          }),
      });
