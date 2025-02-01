import createImgPath from "../function/createImgPath";
import fetchMenuImage from "../supabase/func/fetchMenuImage";
import fetchMenuItem from "../supabase/func/fetchMenuItem";
import fetchOrderList from "../supabase/func/fetchOrderList";
import fetchTableList from "../supabase/func/fetchTableList";
import fetchTableRequestList from "../supabase/func/fetchTableRequestList";

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
          alertType: 'category',
          msgType: method === 'upsert' ? 'update' : method
        }
      }))
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
          isSubmit: false,
        }
      }), undefined, 'fetchFormCategoryItem/fulfilled')
    },
    // 메뉴 생성/수정/삭제
    fetchFormMenuItem: async ({ method, itemInfo, table, file, adminId }) => {
      console.log(itemInfo)
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'menu',
          msgType: method
        }
      }), undefined, 'fetchFormMenuItem/pending')
      // 사진 경로 생성
      const imgPath = createImgPath({ method, file, itemInfo, adminId });
      // 사진 파일 전송
      const imgResult = await fetchMenuImage({ method, file, imgPath })
      // 메뉴 정보 전송
      const fetchResult = await fetchMenuItem({ method, itemInfo, table, imgPath })
      // rejected 추후 함수 처리
      if (imgResult?.error || !fetchResult.status.toString().startsWith('2')) {
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
        }, undefined, 'fetchFormMenuItem/rejected')
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
          isSubmit: false,
        }
      }), undefined, 'fetchFormMenuItem/fulfilled')
    },
    // 주문 목록 삭제/완료 처리
    fetchOrderListStatus: async ({ method, data }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method
        }
      }), undefined, 'fetchOrderListStatus/pending')
      const fetchResult = await fetchOrderList(method, data);
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
        }, undefined, 'fetchOrderListStatus/rejected')
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
          isSubmit: false,
        }
      }), undefined, 'fetchOrderListStatus/fulfilled')
    },
    // 좌석 생성/형태 수정/삭제 처리
    fetchTableListData: async ({ method, dataArr }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method
        }
      }), undefined, 'fetchTableListData/pending')
      const fetchResult = await fetchTableList(method, dataArr);
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
        }, undefined, 'fetchTableListData/rejected')
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
          isSubmit: false,
        }
      }), undefined, 'fetchTableListData/fulfilled')
    },
    // 좌석 요청 알림 읽음 처리
    fetchUpdateAlertMsg: async ({ method, id }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method
        }
      }), undefined, 'fetchUpdateAlertMsg/pending')
      // fetching
      const fetchResult = await fetchTableRequestList(method, id)
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
        }, undefined, 'fetchUpdateAlertMsg/rejected')
        return;
      }
      // fulfilled 처리 제외, 처리 완료 메시지 없어도 됨
    },
  }) :
  (set) => ({
    fetchFormCategoryItem: async ({ method, itemInfo, table }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'category',
          msgType: method === 'upsert' ? 'update' : method
        }
      }))
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
        })
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
          isSubmit: false,
        }
      }))
    },
    fetchFormMenuItem: async ({ method, itemInfo, table, file, adminId }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'menu',
          msgType: method
        }
      }))
      // 사진 경로 생성
      const imgPath = createImgPath({ method, file, itemInfo, adminId });
      // 사진 파일 전송
      const imgResult = await fetchMenuImage({ method, file, imgPath })
      // 메뉴 정보 전송
      const fetchResult = await fetchMenuItem({ method, itemInfo, table, imgPath })
      // rejected 추후 함수 처리
      if (imgResult?.error || !fetchResult.status.toString().startsWith('2')) {
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
        })
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
          isSubmit: false,
        }
      }))
    },
    fetchOrderListStatus: async ({ method, data }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method
        }
      }))
      const fetchResult = await fetchOrderList(method, data);
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
        })
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
          isSubmit: false,
        }
      }))
    },
    fetchTableListData: async ({ method, dataArr }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method
        }
      }))
      const fetchResult = await fetchTableList(method, dataArr);
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
        })
        return;
      }
      // fulfilled
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'fulfilled',
          callCount: 0,
          isSubmit: false,
        }
      }))
    },
    fetchUpdateAlertMsg: async ({ method, id }) => {
      // pending
      set((state) => ({
        submit: {
          ...state.submit,
          status: 'pending',
          isSubmit: true,
          alertType: 'list',
          msgType: method
        }
      }))
      // fetching
      const fetchResult = await fetchTableRequestList(method, id)
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
        })
        return;
      }
      // fulfilled 처리 제외, 처리 완료 메시지 없어도 됨
    },
  }) 