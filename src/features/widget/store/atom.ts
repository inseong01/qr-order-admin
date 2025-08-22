import { atom } from 'jotai';

type Options = 'create-menu-category' | 'update-menu-category' | 'delete-menu-category' | ''; // 위젯 옵션 할당, null은 모달 닫힘

type Widget = {
  isOpen: boolean;
  option: Options;
};

const initialWidget: Widget = {
  isOpen: false,
  option: '',
};

// 위젯 상태
export const widgetAtom = atom<Widget>(initialWidget);

// 위젯 상태 초기화
export const widgetAtomWithReset = atom(null, (_, set) => {
  set(widgetAtom, initialWidget);
});

// 위젯 상태 변경
export const setWidgetAtomState = atom(null, (get, set, { isOpen, option }: { isOpen?: boolean; option?: Options }) => {
  const currentWidget = get(widgetAtom);
  set(widgetAtom, {
    isOpen: isOpen ?? currentWidget.isOpen,
    option: option === '' || option ? option : currentWidget.option,
  });
});
