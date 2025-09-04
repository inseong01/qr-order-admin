import { useAtomValue, useSetAtom } from 'jotai';

import { PATHS } from '@/constants/paths';
import validate from '@/utils/function/validate';
import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import styles from './../common.module.css';
import useAuthForm from '../hooks/use-auth-form';
import CaptchaContainer from '../components/captcha';

import useDisabledState from '../hooks/use-disabled';
import { requestPasswordResetEmail } from '../util/auth-supabase-api';
import { localResetPasswordUrl, productResetPasswordUrl } from '../const';
import { AuthForm, AuthFormSubmitButton, AuthFormTitle, AuthNavLink } from '../components/layout';
import { authStatusAtom, captchaTokenAtom, errorFormAtom, findPwdFormAtom } from '../store/auth-atom';

export default function FindPasswordPage() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const { disabled, authStatus } = useDisabledState();
  const { formState, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: findPwdFormAtom,
    validationSchema: validate.schema.findPassword,
    onSubmit: async (formData) => {
      // 비밀번호 초기화 요청
      const redirectTo = import.meta.env.MODE === 'production' ? productResetPasswordUrl : localResetPasswordUrl;
      const { error } = await requestPasswordResetEmail(formData.id, captchaToken, redirectTo);

      if (error) throw error;

      setAuthStatus('success');
    },
  });

  const description = authStatus === 'error' ? '검증 실패' : !captchaToken ? '확인 중...' : '입력하기';
  const idErrorMsg = errorForm.get('id') ?? '';

  return (
    <CaptchaContainer>
      {/* 상단 */}
      <AuthFormTitle text='비밀번호 찾기' />

      {/* 중간 */}
      <AuthForm onSubmit={handleSubmit} hasLink={true}>
        <FormInputBox>
          <input
            required
            type='email'
            name='id'
            aria-invalid={Boolean(idErrorMsg)}
            data-invalid={Boolean(idErrorMsg)}
            className={styles.input}
            placeholder='가입 시 사용한 이메일'
            value={formState.id}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <FormInputCaption text={idErrorMsg} hasError={Boolean(idErrorMsg)} />
        </FormInputBox>

        <AuthFormSubmitButton text={description} disabled={disabled} />
      </AuthForm>

      {/* 하단 */}
      <nav className={styles.actions}>
        <AuthNavLink text='돌아가기' to={PATHS.AUTH.LOGIN} />
      </nav>
    </CaptchaContainer>
  );
}
