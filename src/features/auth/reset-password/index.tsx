import { useAtomValue, useSetAtom } from 'jotai';

import validate from '@/utils/function/validate';

import styles from './../common.module.css';
import { PWD_MAX, PWD_MIN } from '../const';
import useAuthForm from '../hooks/use-auth-form';
import AuthContainer from '../components/container';
import useDisabledState from '../hooks/use-disabled';
import { updateUserPassword } from '../util/auth-supabase-api';
import { authStatusAtom, captchaTokenAtom, errorFormAtom, resetPwdFormAtom } from '../store/auth-atom';
import { AuthForm, AuthFormInputBox, AuthFormSubmitButton, AuthFormTitle, InputCaption } from '../components/layout';

export default function ResetPasswordPage() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const { disabled, authStatus } = useDisabledState();
  const { formState, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: resetPwdFormAtom,
    validationSchema: validate.schema.resetPassword,
    onSubmit: async (formData) => {
      // 비밀번호 수정
      const { error } = await updateUserPassword(formData.password);

      if (error) throw error;

      // 성공 UI 지연 등장
      setTimeout(() => {
        setAuthStatus('success');
      }, 300);
    },
  });

  const description = authStatus === 'error' ? '검증 실패' : !captchaToken ? '확인 중...' : '수정하기';
  const pwdErrorMsg = errorForm.get('password') ?? '';
  const confirmPwdErrorMsg = errorForm.get('confirmPassword') ?? '';

  return (
    <AuthContainer>
      {/* 상단 */}
      <AuthFormTitle text='비밀번호 수정' />

      {/* 중간 */}
      <AuthForm onSubmit={handleSubmit} hasLink={false}>
        <AuthFormInputBox>
          <input
            required
            type='password'
            name='password'
            aria-invalid={Boolean(pwdErrorMsg)}
            data-invalid={Boolean(pwdErrorMsg)}
            minLength={PWD_MIN}
            maxLength={PWD_MAX}
            className={styles.input}
            placeholder='비밀번호'
            value={formState.password}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <InputCaption text={pwdErrorMsg} hasError={Boolean(pwdErrorMsg)} />

          <input
            required
            type='password'
            name='confirmPassword'
            aria-invalid={Boolean(confirmPwdErrorMsg)}
            data-invalid={Boolean(confirmPwdErrorMsg)}
            className={styles.input}
            placeholder='비밀번호 확인'
            value={formState.confirmPassword}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <InputCaption text={confirmPwdErrorMsg} hasError={Boolean(confirmPwdErrorMsg)} />
        </AuthFormInputBox>

        <AuthFormSubmitButton text={description} disabled={disabled} />
      </AuthForm>
    </AuthContainer>
  );
}
