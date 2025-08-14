/**
 * @file useAuthForm 커스텀 훅의 단위 테스트입니다.
 * @description 폼 상태 관리, 유효성 검사 및 제출 로직이 올바르게 작동하는지 검증합니다.
 */

import z from 'zod';
import * as router from 'react-router';
import { atom, createStore } from 'jotai';
import { ChangeEvent, ReactNode } from 'react';
import { AuthError } from '@supabase/supabase-js';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { TestProvider } from './components/atom-provider';
import useAuthForm from '../../hooks/use-auth-form';
import * as redirectHook from '../../hooks/use-success-redirect';
import { authStatusAtom, resetAllFormsAtom } from '../../store/auth-atom';

// useParams 훅 모킹
vi.spyOn(router, 'useParams').mockReturnValue({ '*': 'test' });

// useSuccessRedirect 훅 모킹
vi.spyOn(redirectHook, 'default').mockImplementation(() => {});

// AuthErrorHandler 모킹
const mockErrorHandle = vi.fn();
vi.mock('../../util/error-handler', () => ({
  AuthErrorHandler: vi.fn().mockImplementation(() => ({
    handle: mockErrorHandle,
  })),
}));

// resetAllFormsAtom 모킹
const mockResetForms = vi.fn();
resetAllFormsAtom.write = mockResetForms;

describe('useAuthForm', () => {
  const formAtom = atom({ id: 'init' });
  const schema = z.object({ id: z.string().min(3) });
  const authFormProps = {
    formAtom,
    validationSchema: schema,
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    // 각 테스트 실행 전에 모든 모의 함수 초기화
    vi.clearAllMocks();
    vi.resetModules();
  });

  describe('폼 초기 상태 및 핸들러', () => {
    it('초기 렌더링 시, 폼 상태와 핸들러 함수를 올바르게 반환', () => {
      const store = createStore();
      const initialValues = new Map<any, any>([[authStatusAtom, 'loading']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider store={store} initialValues={initialValues}>
          {children}
        </TestProvider>
      );
      const { result } = renderHook(() => useAuthForm(authFormProps), { wrapper });

      expect(result.current.formState).toEqual({ id: 'init' });
      expect(result.current.handleInputChange).toBeTypeOf('function');
      expect(result.current.handleSubmit).toBeTypeOf('function');
    });
  });

  describe('폼 입력 변경', () => {
    it('handleInputChange 호출 시, 폼 상태를 올바르게 업데이트', () => {
      const store = createStore();
      const initialValues = new Map<any, any>([[authStatusAtom, 'loading']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider store={store} initialValues={initialValues}>
          {children}
        </TestProvider>
      );
      const { result } = renderHook(() => useAuthForm(authFormProps), { wrapper });

      expect(result.current.formState).toEqual({ id: 'init' });

      act(() => {
        const inputEvent = { target: { name: 'id', value: 'test' } } as ChangeEvent<HTMLInputElement>;
        result.current.handleInputChange(inputEvent);
      });

      expect(result.current.formState).toEqual({ id: 'test' });
    });

    it('handleInputChange 호출 시, authStatus가 "error"일 때 "idle"로 변경', () => {
      const store = createStore();

      expect(store.get(authStatusAtom)).toBe('loading');

      const initialValues = new Map<any, any>([[authStatusAtom, 'error']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider store={store} initialValues={initialValues}>
          {children}
        </TestProvider>
      );
      const { result } = renderHook(() => useAuthForm(authFormProps), { wrapper });

      expect(result.current.formState).toEqual({ id: 'init' });

      act(() => {
        expect(store.get(authStatusAtom)).toBe('error');

        const inputEvent = { target: { name: 'id', value: 'test' } } as ChangeEvent<HTMLInputElement>;
        result.current.handleInputChange(inputEvent);
      });

      expect(store.get(authStatusAtom)).toBe('idle');
      expect(result.current.formState).toEqual({ id: 'test' });
    });
  });

  describe('폼 초기화', () => {
    it('URL params 변경 시, 폼 상태를 초기화', () => {
      const store = createStore();
      const initialValues = new Map<any, any>([[authStatusAtom, 'loading']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider store={store} initialValues={initialValues}>
          {children}
        </TestProvider>
      );
      const { rerender } = renderHook(() => useAuthForm(authFormProps), { wrapper });

      expect(mockResetForms).toHaveBeenCalledTimes(1);

      act(() => {
        (router.useParams as Mock).mockReturnValue({ '*': 'test2' });
        rerender();
      });

      expect(mockResetForms).toHaveBeenCalledTimes(2);
    });
  });

  describe('폼 제출 및 유효성 검사', () => {
    it('handleSubmit 호출 시, Zod 유효성 검사에 실패하면 에러 처리', () => {
      const store = createStore();
      const initialValues = new Map<any, any>([[authStatusAtom, 'loading']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider store={store} initialValues={initialValues}>
          {children}
        </TestProvider>
      );
      const invalidSchema = z.object({ id: z.string().min(10) });
      const { result } = renderHook(() => useAuthForm({ ...authFormProps, validationSchema: invalidSchema }), {
        wrapper,
      });

      expect(store.get(authStatusAtom)).toBe('loading');
      expect(mockErrorHandle).not.toHaveBeenCalled();

      act(() => {
        result.current.handleSubmit({ preventDefault() {} } as any);
      });

      expect(store.get(authStatusAtom)).toBe('error');
      expect(mockErrorHandle).toHaveBeenCalled();
    });

    it('handleSubmit 호출 시, Supabase 제출에 실패하면 에러 처리', async () => {
      const store = createStore();
      const initialValues = new Map<any, any>([[authStatusAtom, 'loading']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider store={store} initialValues={initialValues}>
          {children}
        </TestProvider>
      );
      const supabaseError = new AuthError('Ianonymous_provider_disabled');
      const onSubmit = vi.fn().mockRejectedValue(supabaseError);
      const { result } = renderHook(() => useAuthForm({ ...authFormProps, onSubmit }), { wrapper });

      expect(store.get(authStatusAtom)).toBe('loading');
      expect(mockErrorHandle).not.toHaveBeenCalled();

      await act(async () => {
        result.current.handleSubmit({ preventDefault() {} } as any);
      });

      expect(store.get(authStatusAtom)).toBe('error');
      expect(mockErrorHandle).toHaveBeenCalled();
    });
  });
});
