const initialState = {
  category: {
    id: 0,
    title: '전체메뉴'
  }
}

export const useCategorySlice = (set) => ({
  ...initialState,
  resetCategoryState: () => set(() => ({ category: initialState })),
  changeCategory: ({ id, title }) => set(() => {
    // const currentTitle = title ? '' : title; // ???
    return {
      category: {
        id,
        title,
      }
    }
  })
})