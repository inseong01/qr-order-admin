/**
 * @file useDisabledState 커스텀 훅의 단위 테스트
 * @description authStatus와 captchaToken 상태(atom)의 조합에 따라
 *              UI 요소의 disabled 상태가 올바르게 계산되는지 검증합니다.
 */
import { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, renderHook } from '@testing-library/react';

import TestProvider from './components/atom-provider';
import useDisabledState from '../../hooks/use-disabled';
import { authStatusAtom, captchaTokenAtom } from '../../store/auth-atom';

describe('useDisabledState', () => {
  beforeEach(() => {
    cleanup();
  });

  it('초기 상태에서 비활성화(true) 반환', () => {
    const { result } = renderHook(() => useDisabledState());
    expect(result.current).toEqual({ disabled: true, authStatus: 'loading' });
  });

  describe('captcha 토큰이 없을 경우', () => {
    const token = '';

    it("authStatus가 'idle'일 때, 비활성화(true) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'idle'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: true, authStatus: 'idle' });
    });

    it("authStatus가 'loading'일 때, 비활성화(true) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'loading'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: true, authStatus: 'loading' });
    });

    it("authStatus가 'success'일 때, 비활성화(true) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'success'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: true, authStatus: 'success' });
    });

    it("authStatus가 'error'일 때, 비활성화(true) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'error'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: true, authStatus: 'error' });
    });
  });

  describe('captcha 토큰이 있을 경우', () => {
    const token = 'captcha-token-id';

    it("authStatus가 'idle'일 때, 활성화(false) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'idle'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: false, authStatus: 'idle' });
    });

    it("authStatus가 'loading'일 때, 비활성화(true) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'loading'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: true, authStatus: 'loading' });
    });

    it("authStatus가 'success'일 때, 비활성화(true) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'success'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: true, authStatus: 'success' });
    });

    it("authStatus가 'error'일 때, 비활성화(true) 반환", () => {
      const initialValues = new Map<any, any>([
        [captchaTokenAtom, token],
        [authStatusAtom, 'error'],
      ]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );
      const { result } = renderHook(() => useDisabledState(), { wrapper });
      expect(result.current).toEqual({ disabled: true, authStatus: 'error' });
    });
  });
});
