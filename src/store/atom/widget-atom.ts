import { atom } from 'jotai';

import { Options } from '../../features/widget/const/types';

type Widget = {
  isOpen: boolean;
  option: Options;
};

const initialWidget: Widget = {
  isOpen: false,
  option: null,
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

// 위젯 상태 변경
export const setWidgetState = atom(
  (get) => get(widgetAtom).option,
  (get, set, { isOpen, option }: { isOpen?: boolean; option?: Options }) => {
    const currentWidget = get(widgetAtom);
    set(widgetAtom, { isOpen: isOpen ? isOpen : currentWidget.isOpen, option: option ? option : currentWidget.option });
  }
);
