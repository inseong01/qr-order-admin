import { useAtomValue } from 'jotai';

import { PATHS } from '@/constants/paths';
import validate from '@/utils/function/validate';

import styles from './../common.module.css';
import AuthContainer from '../components/container';
import {
  AuthForm,
  AuthFormInputBox,
  AuthFormSubmitButton,
  AuthFormTitle,
  AuthNavLink,
  InputCaption,
} from '../components/layout';
import useAuthForm from '../hooks/use-auth-form';
import useDisabledState from '../hooks/use-disabled';
import { signInWithEmailAndPassword } from '../util/auth-supabase-api';
import { captchaTokenAtom, errorFormAtom, loginFormAtom } from '../store/auth-atom';

/**
 * 로그인 페이지 전체 UI
 */
export default function LoginPage() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const { disabled, authStatus } = useDisabledState();
  const { formState, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: loginFormAtom,
    validationSchema: validate.schema.login,
    onSubmit: async (formData) => {
      // 로그인
      const { error } = await signInWithEmailAndPassword(formData.id, formData.password, captchaToken);

      if (error) throw error;
    },
  });

  const description = authStatus === 'error' ? '검증 실패' : !captchaToken ? '확인 중...' : '입력하기';
  const idErrorMsg = errorForm.get('id') ?? '';
  const pwdErrorMsg = errorForm.get('password') ?? '';

  return (
    <AuthContainer>
      {/* 상단 */}
      <AuthFormTitle text='로그인' />

      {/* 중간 */}
      <AuthForm onSubmit={handleSubmit}>
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
            className={styles.input}
            placeholder='비밀번호'
            value={formState.password}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <InputCaption text={pwdErrorMsg} hasError={Boolean(pwdErrorMsg)} />
        </AuthFormInputBox>

        <AuthFormSubmitButton text={description} disabled={disabled} />
      </AuthForm>

      {/* 하단 */}
      <nav className={styles.actions}>
        <AuthNavLink text='회원가입' to={PATHS.AUTH.SIGNUP} />

        <AuthNavLink text='비밀번호 찾기' to={PATHS.AUTH.FIND.PASSWORD} />
      </nav>
    </AuthContainer>
  );
}
