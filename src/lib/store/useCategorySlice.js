const initialState = {
  category: {
    id: 0,
    title: '전체메뉴'
  }
}

export const useCategorySlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    resetCategoryState: () => set(initialState, undefined, 'category/resetCategoryState'),
    changeCategory: ({ id, title }) => set(() => {
      return {
        category: {
          id,
          title,
        }
      }
    }, undefined, 'category/changeCategory')
  }) :
  (set) => ({
    ...initialState,
    resetCategoryState: () => set(initialState),
    changeCategory: ({ id, title }) => set(() => {
      return {
        category: {
          id,
          title,
        }
      }
    })
  })