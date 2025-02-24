import createImgPath from '../function/createImgPath';
import fetchMenuImage from '../supabase/func/fetchMenuImage';
import fetchMenuItem from '../supabase/func/fetchMenuItem';
import fetchOrderList from '../supabase/func/fetchOrderList';
import fetchTableList, { DataArr } from '../supabase/func/fetchTableList';
import fetchTableRequestList from '../supabase/func/fetchTableRequestList';
import fetchCategoryMenu from '../supabase/func/fetchCategoryMenu';
import {
  AdminId,
  AllOrderList,
  InsertMenuCategoryList,
  MenuCategoryList,
  MenuList,
} from '../../types/common';
import { MsgType } from './useSubmitSlice';
import { UseBoundStore } from './useBoundStore';

import { StateCreator } from 'zustand';

// select는 orderList 조회할 때 사용, 알림에서 사용되지 않는 문자열 타입
export type Method = 'select' | 'update' | 'delete' | 'upsert' | 'insert' | '';
export type Table = 'category-menu' | 'menu';

export type FileBody = File | undefined;

export interface UseFetchSlice {
  fetchFormCategoryItem: ({
    method,
    itemInfo,
    table,
  }: {
    method: Method;
    itemInfo: MenuCategoryList | InsertMenuCategoryList | MenuCategoryList[];
    table: Table;
  }) => Promise<void>;
  fetchFormMenuItem: ({
    method,
    itemInfo,
    table,
    file,
    adminId,
  }: {
    method: Method;
    itemInfo: MenuList;
    table: Table;
    file: FileBody;
    adminId: AdminId;
  }) => Promise<void>;
  fetchOrderListStatus: ({ method, data }: { method: Method; data: AllOrderList }) => Promise<void>;
  fetchTableListData: ({ method, dataArr }: { method: Method; dataArr: DataArr<Method> }) => Promise<void>;
  fetchUpdateAlertMsg: ({ method, id }: { method: Method; id: string }) => Promise<void>;
}

export const useFetchSlice: StateCreator<UseBoundStore, [['zustand/devtools', never]], [], UseFetchSlice> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        // 메뉴 카테고리 생성/수정/삭제
        fetchFormCategoryItem: async ({ method, itemInfo, table }) => {
          // pending
          set(
            (state) => {
              const msgType: MsgType = method === 'upsert' ? 'update' : method;
              return {
                submit: {
                  ...state.submit,
                  status: 'pending',
                  isSubmit: true,
                  alertType: 'category',
                  msgType,
                },
              };
            },
            undefined,
            'fetchFormCategoryItem/pending'
          );
          // fetching
          const fetchResult = await fetchCategoryMenu({ method, itemInfo, table });
          // 오류 발생 시 null 반환
          if (fetchResult === null) {
            set(
              (state) => {
                const callCount = state.submit.callCount + 1;
                const preventSubmit = callCount >= 5 ? true : false;
                return {
                  submit: {
                    ...state.submit,
                    isSubmit: false,
                    status: 'rejected',
                    isError: preventSubmit,
                    callCount,
                  },
                };
              },
              undefined,
              'fetchFormCategoryItem/rejected'
            );
            return;
          }
          // fulfilled
          set(
            (state) => ({
              submit: {
                ...state.submit,
                status: 'fulfilled',
                callCount: 0,
                isSubmit: false,
              },
            }),
            undefined,
            'fetchFormCategoryItem/fulfilled'
          );
        },
        // 메뉴 생성/수정/삭제
        fetchFormMenuItem: async ({ method, itemInfo, table, file, adminId }) => {
          // pending
          set(
            (state) => ({
              submit: {
                ...state.submit,
                status: 'pending',
                isSubmit: true,
                alertType: 'menu',
                msgType: method,
              },
            }),
            undefined,
            'fetchFormMenuItem/pending'
          );
          // 사진 경로 생성
          const imgPath = createImgPath({ method, file, itemInfo, adminId });
          // 사진 파일 전송
          const imgResult = await fetchMenuImage({ method, file, imgPath });
          // 메뉴 정보 전송
          const fetchResult = await fetchMenuItem({ method, itemInfo, table });
          if (imgResult === null || fetchResult === null) {
            set(
              (state) => {
                const callCount = state.submit.callCount + 1;
                const preventSubmit = callCount >= 5 ? true : false;
                return {
                  submit: {
                    ...state.submit,
                    isSubmit: false,
                    status: 'rejected',
                    isError: preventSubmit,
                    callCount,
                  },
                };
              },
              undefined,
              'fetchFormMenuItem/rejected'
            );
            return;
          }
          // fulfilled
          set(
            (state) => ({
              submit: {
                ...state.submit,
                status: 'fulfilled',
                callCount: 0,
                isSubmit: false,
              },
            }),
            undefined,
            'fetchFormMenuItem/fulfilled'
          );
        },
        // 주문 목록 삭제/완료 처리
        fetchOrderListStatus: async ({ method, data }) => {
          // pending
          set(
            (state) => ({
              submit: {
                ...state.submit,
                status: 'pending',
                isSubmit: true,
                alertType: 'list',
              },
            }),
            undefined,
            'fetchOrderListStatus/pending'
          );
          const fetchResult = await fetchOrderList(method, data);
          if (fetchResult === null) {
            set(
              (state) => {
                const callCount = state.submit.callCount + 1;
                const preventSubmit = callCount >= 5 ? true : false;
                return {
                  submit: {
                    ...state.submit,
                    isSubmit: false,
                    status: 'rejected',
                    isError: preventSubmit,
                    callCount,
                  },
                };
              },
              undefined,
              'fetchOrderListStatus/rejected'
            );
            return;
          }
          // fulfilled
          set(
            (state) => ({
              submit: {
                ...state.submit,
                status: 'fulfilled',
                callCount: 0,
                isSubmit: false,
              },
            }),
            undefined,
            'fetchOrderListStatus/fulfilled'
          );
        },
        // 좌석 생성/형태 수정/삭제 처리
        fetchTableListData: async ({ method, dataArr }) => {
          // pending
          set(
            (state) => ({
              submit: {
                ...state.submit,
                status: 'pending',
                isSubmit: true,
                alertType: 'list',
                msgType: method,
              },
            }),
            undefined,
            'fetchTableListData/pending'
          );
          const fetchResult = await fetchTableList(method, dataArr);
          // rejected 추후 함수 처리
          // 오류 발생 시 null 반환 임시 적용, 확인요
          if (fetchResult === null) {
            set(
              (state) => {
                const callCount = state.submit.callCount + 1;
                const preventSubmit = callCount >= 5 ? true : false;
                return {
                  submit: {
                    ...state.submit,
                    isSubmit: false,
                    status: 'rejected',
                    isError: preventSubmit,
                    callCount,
                  },
                };
              },
              undefined,
              'fetchTableListData/rejected'
            );
            return;
          }
          // fulfilled
          set(
            (state) => ({
              submit: {
                ...state.submit,
                status: 'fulfilled',
                callCount: 0,
                isSubmit: false,
              },
            }),
            undefined,
            'fetchTableListData/fulfilled'
          );
        },
        // 좌석 요청 알림 읽음 처리
        fetchUpdateAlertMsg: async ({ method, id }) => {
          // fetching
          const fetchResult = await fetchTableRequestList(method, id);
          // rejected 추후 함수 처리
          if (fetchResult === null) {
            // if (!fetchResult.status.toString().startsWith('2')) {
            set(
              (state) => {
                const callCount = state.submit.callCount + 1;
                const preventSubmit = callCount >= 5 ? true : false;
                return {
                  submit: {
                    ...state.submit,
                    isSubmit: false,
                    status: 'rejected',
                    isError: preventSubmit,
                    callCount,
                  },
                };
              },
              undefined,
              'fetchUpdateAlertMsg/rejected'
            );
            return;
          }
        },
      })
    : (set) => ({
        fetchFormCategoryItem: async ({ method, itemInfo, table }) => {
          // pending
          set((state) => {
            const msgType: MsgType = method === 'upsert' ? 'update' : method;
            return {
              submit: {
                ...state.submit,
                status: 'pending',
                isSubmit: true,
                alertType: 'category',
                msgType,
              },
            };
          });
          // fetching
          const fetchResult = await fetchCategoryMenu({ method, itemInfo, table });
          // 오류 발생 시 null 반환
          if (fetchResult === null) {
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
                },
              };
            });
            return;
          }
          // fulfilled
          set((state) => ({
            submit: {
              ...state.submit,
              status: 'fulfilled',
              callCount: 0,
              isSubmit: false,
            },
          }));
        },
        fetchFormMenuItem: async ({ method, itemInfo, table, file, adminId }) => {
          // pending
          set((state) => ({
            submit: {
              ...state.submit,
              status: 'pending',
              isSubmit: true,
              alertType: 'menu',
              msgType: method,
            },
          }));
          // 사진 경로 생성
          const imgPath = createImgPath({ method, file, itemInfo, adminId });
          // 사진 파일 전송
          const imgResult = await fetchMenuImage({ method, file, imgPath });
          // 메뉴 정보 전송
          const fetchResult = await fetchMenuItem({ method, itemInfo, table });
          if (imgResult === null || fetchResult === null) {
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
                },
              };
            });
            return;
          }
          // fulfilled
          set((state) => ({
            submit: {
              ...state.submit,
              status: 'fulfilled',
              callCount: 0,
              isSubmit: false,
            },
          }));
        },
        fetchOrderListStatus: async ({ method, data }) => {
          // pending
          set((state) => ({
            submit: {
              ...state.submit,
              status: 'pending',
              isSubmit: true,
              alertType: 'list',
            },
          }));
          const fetchResult = await fetchOrderList(method, data);
          if (fetchResult === null) {
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
                },
              };
            });
            return;
          }
          // fulfilled
          set((state) => ({
            submit: {
              ...state.submit,
              status: 'fulfilled',
              callCount: 0,
              isSubmit: false,
            },
          }));
        },
        fetchTableListData: async ({ method, dataArr }) => {
          // pending
          set((state) => ({
            submit: {
              ...state.submit,
              status: 'pending',
              isSubmit: true,
              alertType: 'list',
              msgType: method,
            },
          }));
          const fetchResult = await fetchTableList(method, dataArr);
          // rejected 추후 함수 처리
          // 오류 발생 시 null 반환 임시 적용, 확인요
          if (fetchResult === null) {
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
                },
              };
            });
            return;
          }
          // fulfilled
          set((state) => ({
            submit: {
              ...state.submit,
              status: 'fulfilled',
              callCount: 0,
              isSubmit: false,
            },
          }));
        },
        fetchUpdateAlertMsg: async ({ method, id }) => {
          // fetching
          const fetchResult = await fetchTableRequestList(method, id);
          // rejected 추후 함수 처리
          if (fetchResult === null) {
            // if (!fetchResult.status.toString().startsWith('2')) {
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
                },
              };
            });
            return;
          }
        },
      });
