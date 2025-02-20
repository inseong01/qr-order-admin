import { Method } from './useFetchSlice';

import { StateCreator } from 'zustand';

export type MsgType = 'complete' | 'update' | 'insert' | 'create' | 'delete' | '' | Method;
type Status = 'pending' | 'fulfilled' | 'rejected' | '';
type AlertType = 'menu' | 'category' | 'list' | 'product' | '';

type InitialState = {
  submit: {
    isSubmit: boolean;
    status: Status;
    alertType: AlertType;
    msgType: MsgType;
    callCount: number;
    isError: boolean;
  };
};

export interface UseSubmitSlice {
  submit: {
    isSubmit: boolean;
    status: Status;
    alertType: AlertType;
    msgType: MsgType;
    callCount: number;
    isError: boolean;
  };
  resetSubmitState: () => void;
  changeSubmitMsgType: ({ msgType }: { msgType: MsgType }) => void;
  setInitSubmitStatus: () => void;
}

export const initialState: InitialState = {
  submit: {
    isSubmit: false,
    status: '',
    alertType: '',
    msgType: '',
    callCount: 0,
    isError: false,
  },
};

export const useSubmitSlice: StateCreator<UseSubmitSlice, [['zustand/devtools', never]], [], UseSubmitSlice> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        resetSubmitState: () => set(initialState, undefined, 'submit/resetSubmitState'),
        changeSubmitMsgType: ({ msgType }) =>
          set(
            (state) => {
              return {
                submit: {
                  ...state.submit,
                  msgType,
                },
              };
            },
            undefined,
            'submit/changeSubmitMsgType'
          ),
        setInitSubmitStatus: () =>
          set(
            (state) => {
              return {
                submit: {
                  ...state.submit,
                  status: '',
                },
              };
            },
            undefined,
            'submit/setInitSubmitStatus'
          ),
      })
    : (set) => ({
        ...initialState,
        resetSubmitState: () => set(initialState),
        changeSubmitMsgType: ({ msgType }) =>
          set((state) => {
            return {
              submit: {
                ...state.submit,
                msgType,
              },
            };
          }),
        setInitSubmitStatus: () =>
          set((state) => {
            return {
              submit: {
                ...state.submit,
                status: '',
              },
            };
          }),
      });
