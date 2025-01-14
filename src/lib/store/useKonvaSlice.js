const initialState = {
  konva: {
    type: '',
    isAble: false,
    isEditing: false,
    isEditEnd: false,
    target: {
      id: []
    }
  }
}

export const useKonvaSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    resetKonvaState: () => set(initialState, undefined, 'konva/resetKonvaState'),
    changeKonvaEditState: ({ editType }) => set(() => {
      return {
        konva: {
          ...initialState.konva,
          type: editType,
          isAble: true,
          isEditing: editType === 'create' && true
        }
      }
    }, undefined, 'konva/changeKonvaEditState'),
    getEditKonvaTableId: ({ id }) => set((state) => {
      return {
        konva: {
          ...state.konva,
          target: {
            id
          }
        }
      }
    }, undefined, 'konva/getEditKonvaTableId'),
    changeKonvaIsEditingState: ({ isEditing }) => set((state) => {
      return {
        konva: {
          ...state.konva,
          isEditing
        }
      }
    }, undefined, 'konva/changeKonvaIsEditingState'),
    setKonvaEditEnd: ({ isEditEnd }) => set(state => ({ konva: { ...state.konva, isEditEnd } }), undefined, 'konva/setKonvaEditEnd')
  }) :
  (set) => ({
    ...initialState,
    resetKonvaState: () => set(initialState),
    changeKonvaEditState: ({ editType }) => set(() => {
      return {
        konva: {
          ...initialState.konva,
          type: editType,
          isAble: true,
          isEditing: editType === 'create' && true
        }
      }
    }),
    getEditKonvaTableId: ({ id }) => set((state) => {
      return {
        konva: {
          ...state.konva,
          target: {
            id
          }
        }
      }
    }),
    changeKonvaIsEditingState: ({ isEditing }) => set((state) => {
      return {
        konva: {
          ...state.konva,
          isEditing
        }
      }
    }),
    setKonvaEditEnd: ({ isEditEnd }) => set(state => ({ konva: { ...state.konva, isEditEnd } }))
  }) 