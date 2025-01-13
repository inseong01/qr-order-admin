import createImgPath from "../function/createImgPath";
import fetchMenuImage from "../supabase/func/fetchMenuImage";
import fetchMenuItem from "../supabase/func/fetchMenuItem";

// {
//   "error": {},
//   "data": null,
//   "count": null,
//   "status": 404,
//   "statusText": ""
// }

export const useFetchSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    // 메뉴 카테고리 생성/수정/삭제
    fetchFormCategoryItem: async ({ method, itemInfo, table }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method === 'upsert' ? 'update' : method
        }
      }), undefined, 'fetchFormCategoryItem/pending')
      // fetching
      const fetchResult = await fetchMenuItem({ method, itemInfo, table })
      // rejected 추후 함수 처리
      if (!fetchResult.status.toString().startsWith('2')) {
        set((state) => {
          const callCount = state.submit.callCount + 1;
          const preventSubmit = callCount >= 5 ? true : false;
          return {
            submit: {
              ...state.submit,
              isSubmit: false,
              status: 'rejected',
              isError: preventSubmit,
              callCount,
            }
          }
        }, undefined, 'fetchFormCategoryItem/rejected')
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
        }
      }), undefined, 'fetchFormCategoryItem/fulfilled')
    },
    // 메뉴 생성/수정/삭제
    fetchFormMenuItem: async ({ method, itemInfo, table, file, adminId }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method
        }
      }), undefined, 'fetchFormMenuItem/pending')
      // fetching
      // 원본 복제
      const copyItemInfo = { ...itemInfo };
      // 사진 경로 생성
      const imgPath = createImgPath({ method, file, itemInfo: copyItemInfo, adminId });
      // 사진 파일 전송
      const imgResult = await fetchMenuImage({ method, file, imgPath })
      console.log('imgResult: ', imgResult)
      // 메뉴 정보 전송
      const fetchResult = await fetchMenuItem({ method, itemInfo: copyItemInfo, table, imgPath })
      console.log('fetchResult: ', fetchResult)
      // rejected 추후 함수 처리
      if (!imgResult && !fetchResult.status.toString().startsWith('2')) {
        set((state) => {
          const callCount = state.submit.callCount + 1;
          const preventSubmit = callCount >= 5 ? true : false;
          return {
            submit: {
              ...state.submit,
              isSubmit: false,
              status: 'rejected',
              isError: preventSubmit,
              callCount,
            }
          }
        }, undefined, 'fetchFormCategoryItem/rejected')
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
        }
      }), undefined, 'fetchFormMenuItem/fulfilled')
    }
  }) :
  (set) => ({
    // 메뉴 카테고리 생성/수정/삭제
    fetchFormCategoryItem: async ({ method, itemInfo, table }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list'
        }
      }))
      // fetching
      const fetchResult = await fetchMenuItem({ method, itemInfo, table })
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
        }
      }))
    },
    // 메뉴 생성/수정/삭제
    fetchFormMenuItem: async ({ method, itemInfo, table, file, adminId }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list'
        }
      }))
      // fetching
      // 원본 복제
      const copyItemInfo = { ...itemInfo };
      // 사진 경로 생성
      const imgPath = createImgPath({ method, file, itemInfo: copyItemInfo, adminId });
      // 사진 파일 전송
      const imgResult = await fetchMenuImage({ method, file, imgPath })
      // 메뉴 정보 전송
      const fetchResult = await fetchMenuItem({ method, itemInfo: copyItemInfo, table, imgPath })
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
        }
      }))
    }
  }) 