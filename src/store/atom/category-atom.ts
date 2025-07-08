import { atom } from 'jotai';

//- zustand
// const initialState: InitialState = {
//   category: {
//     id: 0,
//     title: '전체메뉴',
//   },
// };

//- jotai
type Category = {
  id: number;
  title: string;
};

const initialCategory: Category = {
  id: 0,
  title: '전체메뉴',
};

// 카테고리 상태
export const categoryAtom = atom<Category>(initialCategory);

// 카테고리 상태 초기화
export const categoryAtomWithReset = atom(
  (get) => get(categoryAtom),
  (_, set) => {
    set(categoryAtom, initialCategory);
  }
);
