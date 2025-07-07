import { atom } from 'jotai';

//- zustand
// export type KonvaEditType = 'insert' | 'update' | 'delete' | '';
// type InitialState = {
//   konva: {
//     type: KonvaEditType;
//     isAble: boolean;
//     isEditing: boolean;
//     target: {
//       id: Array<string>;
//     };
//   };
// };

//- jotai
export type KonvaEditType = 'insert' | 'update' | 'delete' | '';

type Konva = {
  type: KonvaEditType;
  isAble: boolean;
  isEditing: boolean;
  target: {
    id: Array<string>;
  };
};

const initialKonva: Konva = {
  type: '',
  isAble: false,
  isEditing: false,
  target: {
    id: [],
  },
};

// 콘바 상태
export const konvaAtom = atom<Konva>(initialKonva);

// 콘바 상태 초기화
export const konvaAtomWithReset = atom(
  (get) => get(konvaAtom),
  (_, set) => {
    set(konvaAtom, initialKonva);
  }
);

// 콘바 편집 상태 변경
export const konvaEditStateAtom = atom(
  (get) => get(konvaAtom).type,
  (_, set, editType: KonvaEditType) => {
    set(konvaAtom, {
      ...initialKonva,
      type: editType,
      isAble: true,
      isEditing: editType === 'insert',
    });
  }
);

// 콘바 테이블 아이디 편집
export const editKonvaTableIdAtom = atom(
  (get) => get(konvaAtom).target.id,
  (get, set, id: Array<string>) => {
    const currentKonva = get(konvaAtom);
    set(konvaAtom, {
      ...currentKonva,
      target: {
        id,
      },
    });
  }
);

// 콘바 편집중 상태 변경
export const konvaIsEditingAtom = atom(
  (get) => get(konvaAtom).isEditing,
  (get, set, isEditing: boolean) => {
    const currentKonva = get(konvaAtom);
    set(konvaAtom, {
      ...currentKonva,
      isEditing,
    });
  }
);
