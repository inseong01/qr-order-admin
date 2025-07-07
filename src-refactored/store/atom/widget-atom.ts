import { atom } from 'jotai';

//- zustand
// export type OptionNumList = 1 | 2;
// type InitialState = {
//   widget: {
//     isOpen: boolean;
//     openOptionList: {
//       1: boolean;
//       2: boolean;
//     };
//   };
// };

//- jotai
export type OptionNumList = 1 | 2;

type Widget = {
  isOpen: boolean;
  openOptionList: {
    1: boolean;
    2: boolean;
  };
};

const initialWidget: Widget = {
  isOpen: false,
  openOptionList: {
    1: false,
    2: false,
  },
};

// 위젯 상태
export const widgetAtom = atom<Widget>(initialWidget);

// 위젯 상태 초기화
export const widgetAtomWithReset = atom(
  (get) => get(widgetAtom),
  (_, set) => {
    set(widgetAtom, initialWidget);
  }
);

// 위젯 옵션 리스트 상태 변경
export const widgetOptionListAtom = atom(
  (get) => get(widgetAtom).openOptionList,
  (get, set, { optNum }: { optNum: OptionNumList }) => {
    const currentWidget = get(widgetAtom);
    const openOptionList = {
      ...initialWidget.openOptionList,
      [optNum]: !currentWidget.openOptionList[optNum],
    };
    set(widgetAtom, { ...currentWidget, openOptionList });
  }
);
