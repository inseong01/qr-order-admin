import { StateCreator } from 'zustand';

type InitialState = {
  category: {
    id: number;
    title: string;
  };
};

const initialState: InitialState = {
  category: {
    id: 0,
    title: '전체메뉴',
  },
};

export interface UseCategorySlice {
  category: {
    id: number;
    title: string;
  };
  resetCategoryState: () => void;
  changeCategory: ({ id, title }: { id: number; title: string }) => void;
}

export const useCategorySlice: StateCreator<
  UseCategorySlice,
  [['zustand/devtools', never]],
  [],
  UseCategorySlice
> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        resetCategoryState: () => set(initialState, undefined, 'category/resetCategoryState'),
        changeCategory: ({ id, title }) =>
          set(
            () => {
              return {
                category: {
                  id,
                  title,
                },
              };
            },
            undefined,
            'category/changeCategory'
          ),
      })
    : (set) => ({
        ...initialState,
        resetCategoryState: () => set(initialState),
        changeCategory: ({ id, title }) =>
          set(() => {
            return {
              category: {
                id,
                title,
              },
            };
          }),
      });
