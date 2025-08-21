import { ZodType } from 'zod';
import { ChangeEvent, FormEvent } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from 'jotai';

import { showToastAtom } from '@/features/alert/toast/store/atom';

import {
  authStatusAtom,
  captchaRefreshAtom,
  clearErrorFormAtom,
  FormInputs,
  setErrorFormAtom,
} from '../store/auth-atom';
import useSuccessRedirect from './use-success-redirect';
import { AuthErrorHandler } from '../util/error-handler';
import useResetAuthForm from './use-reset-form';

type UseAuthFormProps<T> = {
  formAtom: PrimitiveAtom<T>;
  validationSchema: ZodType<T>;
  onSubmit: (data: T) => Promise<void>;
};

/**
 * 인증 관련 폼(로그인, 회원가입, 비밀번호 찾기)의 공통 로직을 관리하는 커스텀 훅
 * @param formAtom - Jotai atom으로 생성된 폼 상태
 * @param validationSchema - Zod 스키마
 * @param onSubmit - 폼 제출 시 실행될 비동기 함수
 */
export default function useAuthForm<T>({ formAtom, validationSchema, onSubmit }: UseAuthFormProps<T>) {
  const [formState, setFormState] = useAtom(formAtom);
  const authStatus = useAtomValue(authStatusAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const setErrorForm = useSetAtom(setErrorFormAtom);
  const clearErrorForm = useSetAtom(clearErrorFormAtom);
  const captchaRefresh = useSetAtom(captchaRefreshAtom);
  const showToast = useSetAtom(showToastAtom);

  /** 폼 초기화 */
  useResetAuthForm();

  /** 성공 리다이렉트 */
  useSuccessRedirect();

  /** Supabase Auth 오류 처리기 */
  const errorHandler = new AuthErrorHandler(showToast, setErrorForm, captchaRefresh);

  /**
   * 입력 값 변경 시 폼 상태를 업데이트,
   * 해당 필드의 에러 메시지를 초기화
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev: T) => ({ ...prev, [name]: value }));
    clearErrorForm(name as keyof FormInputs);

    // 에러 상태면 다시 유휴 상태로 변경
    if (authStatus === 'error') {
      setAuthStatus('idle');
    }
  };

  /**
   * 폼 제출 시 유효성 검사를 수행,
   * 성공 시 onSubmit 콜백을 실행
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthStatus('loading');

    try {
      // Zod 스키마로 폼 데이터 검증
      validationSchema.parse(formState);

      // 에러 상태 초기화
      setErrorForm([]);

      // 비즈니스 로직 실행
      await onSubmit(formState);
    } catch (error) {
      setAuthStatus('error');
      errorHandler.handle(error);
    }
  };

  return {
    formState,
    handleInputChange,
    handleSubmit,
  };
}
