import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router';

import { PATHS } from '@/constants/paths';
import validate from '@/utils/function/validate';

import styles from './../common.module.css';
import useAuthForm from '../hooks/use-auth-form';
import AuthContainer from '../components/container';
import useDisabledState from '../hooks/use-disabled';
import { updateUserPassword } from '../util/auth-supabase-api';
import { captchaTokenAtom, errorFormAtom, resetPwdFormAtom } from '../store/auth-atom';
import { AuthForm, AuthFormInputBox, AuthFormSubmitButton, AuthFormTitle, InputCaption } from '../components/layout';

export default function ResetPasswordPage() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const navigate = useNavigate();
  const { disabled, authStatus } = useDisabledState();
  const { formState, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: resetPwdFormAtom,
    validationSchema: validate.schema.resetPassword,
    onSubmit: async (formData) => {
      // 비밀번호 수정
      const { error } = await updateUserPassword(formData.password);

      // 지연
      await new Promise((resolve) => setTimeout(resolve, 700));

      if (error) throw error;

      // 알림
      alert('수정되었습니다!');

      // 리다이렉트
      navigate(PATHS.AUTH.LOGIN, { replace: true });
    },
  });

  const description =
    authStatus === 'error'
      ? '검증 실패'
      : !captchaToken
        ? '확인 중...'
        : authStatus === 'success'
          ? '수정 성공'
          : '수정하기';
  const pwdErrorMsg = errorForm.get('password') ?? '';

  return (
    <AuthContainer>
      {/* 상단 */}
      <AuthFormTitle text='비밀번호 수정' />

      {/* 중간 */}
      <AuthForm onSubmit={handleSubmit}>
        <AuthFormInputBox>
          <input
            required
            type='password'
            name='password'
            aria-invalid={Boolean(pwdErrorMsg)}
            data-invalid={Boolean(pwdErrorMsg)}
            className={styles.input}
            placeholder='새로운 비밀번호를 입력해주세요.'
            value={formState.password}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <InputCaption text={pwdErrorMsg} hasError={Boolean(pwdErrorMsg)} />
        </AuthFormInputBox>

        <AuthFormSubmitButton text={description} disabled={disabled} />
      </AuthForm>
    </AuthContainer>
  );
}
