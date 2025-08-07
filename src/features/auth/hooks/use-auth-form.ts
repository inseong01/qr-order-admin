import { PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ZodError, ZodType } from 'zod';
import { useParams } from 'react-router';

import {
  clearErrorFormAtom,
  loadingStateAtom,
  setErrorFormAtom,
  SignupForm,
  successStateAtom,
} from '../store/form-atom';
import { captchaRefreshAtom } from '../store/token-atom';
import { CAPTCHA_TOKEN } from '../const';
import { AuthError } from '@supabase/supabase-js';

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
  const [isLoading, setIsLoading] = useAtom(loadingStateAtom);
  const [isSuccess, setSuccess] = useAtom(successStateAtom);
  const setErrorForm = useSetAtom(setErrorFormAtom);
  const clearErrorForm = useSetAtom(clearErrorFormAtom);
  const captchaRefresh = useSetAtom(captchaRefreshAtom);
  const { '*': params } = useParams();

  /** 경로 이동 시 제출 상태 초기화 */
  useEffect(() => {
    setSuccess(false);
  }, [params]);

  /**
   * 입력 값 변경 시 폼 상태를 업데이트,
   * 해당 필드의 에러 메시지를 초기화
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev: T) => ({ ...prev, [name]: value }));
    clearErrorForm(name as keyof SignupForm);
  };

  /**
   * 폼 제출 시 유효성 검사를 수행,
   * 성공 시 onSubmit 콜백을 실행
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Zod 스키마로 폼 데이터 검증
      validationSchema.parse(formState);

      // 에러 상태 초기화
      setErrorForm([]);

      // 비즈니스 로직 실행
      await onSubmit(formState);

      // 성공 처리
      setSuccess(true);
    } catch (error) {
      if (error instanceof ZodError) {
        // Zod 유효성 검사 실패 시 에러 상태 업데이트
        setErrorForm(error.issues);
      } else if (error instanceof AuthError) {
        // AuthError 목록
        switch (error.code) {
          case 'captcha_failed': {
            captchaRefresh();
          }
        }
      } else {
        alert('로그인 오류');
      }
      console.error('An unexpected error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    isLoading,
    isSuccess,
    handleInputChange,
    handleSubmit,
  };
}
