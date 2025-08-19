import { useAtomValue, useSetAtom } from 'jotai';

import { PATHS } from '@/constants/paths';
import validate from '@/utils/function/validate';

import styles from './../common.module.css';
import { PWD_MAX, PWD_MIN } from '../const';
import useAuthForm from '../hooks/use-auth-form';
import AuthContainer from '../components/container';
import {
  AuthForm,
  AuthFormInputBox,
  AuthFormSubmitButton,
  AuthFormTitle,
  AuthNavLink,
  InputCaption,
} from '../components/layout';
import useDisabledState from '../hooks/use-disabled';
import { signUpNewUser } from '../util/auth-supabase-api';
import { authStatusAtom, captchaTokenAtom, errorFormAtom, signupFormAtom } from '../store/auth-atom';

export default function SignUpPage() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const { disabled, authStatus } = useDisabledState();
  const { formState, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: signupFormAtom,
    validationSchema: validate.schema.signup,
    onSubmit: async (formData) => {
      // 회원가입
      const { error } = await signUpNewUser(formData.id, formData.password, captchaToken, {
        signup_origin: 'qr_order_admin',
        is_approved: false,
      });

      if (error) throw error;

      // 성공 UI 지연 등장
      setTimeout(() => {
        setAuthStatus('success');
      }, 300);
    },
  });

  const description = authStatus === 'error' ? '검증 실패' : !captchaToken ? '확인 중...' : '가입하기';
  const idErrorMsg = errorForm.get('id') ?? '';
  const pwdErrorMsg = errorForm.get('password') ?? '';
  const confirmPwdErrorMsg = errorForm.get('confirmPassword') ?? '';

  return (
    <AuthContainer>
      {/* 상단 */}
      <AuthFormTitle text='회원가입' />

      {/* 중간 */}
      <AuthForm onSubmit={handleSubmit} hasLink={true}>
        <AuthFormInputBox>
          <input
            required
            type='email'
            name='id'
            aria-invalid={Boolean(idErrorMsg)}
            data-invalid={Boolean(idErrorMsg)}
            className={styles.input}
            placeholder='이메일'
            value={formState.id}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <InputCaption text={idErrorMsg} hasError={Boolean(idErrorMsg)} />

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

      {/* 하단 */}
      <nav>
        <AuthNavLink text='돌아가기' to={PATHS.AUTH.LOGIN} />
      </nav>
    </AuthContainer>
  );
}
