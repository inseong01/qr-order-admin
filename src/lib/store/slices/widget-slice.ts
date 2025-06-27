import { StateCreator } from 'zustand';

// opt 추가 시 숫자(옵션 번호) 할당
export type OptionNumList = 1 | 2;

type InitialState = {
  widget: {
    isOpen: boolean;
    openOptionList: {
      1: boolean;
      2: boolean;
    };
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
  },
};

export interface UseWidgetSlice {
  widget: {
    isOpen: boolean;
    openOptionList: {
      1: boolean;
      2: boolean;
    };
  };
  resetWidgetState: () => void;
  openCloseWidget: () => void;
  setWidgetOptionListState: ({ optNum }: { optNum: OptionNumList }) => void;
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
        setWidgetOptionListState: ({ optNum }) =>
          set((state) => {
            const openOptionList = {
              ...initialState.widget.openOptionList,
              [optNum]: !state.widget.openOptionList[optNum],
            };
            return { widget: { ...state.widget, openOptionList } };
          }),
      });
