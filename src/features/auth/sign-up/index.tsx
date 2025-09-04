import { useAtomValue, useSetAtom } from 'jotai';

import { PATHS } from '@/constants/paths';
import validate from '@/utils/function/validate';
import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import styles from './../common.module.css';
import { PWD_MAX, PWD_MIN } from '../const';
import useAuthForm from '../hooks/use-auth-form';
import CaptchaContainer from '../components/captcha';
import useDisabledState from '../hooks/use-disabled';
import { signOutUser, signUpNewUser } from '../util/auth-supabase-api';
import { AuthForm, AuthFormSubmitButton, AuthFormTitle, AuthNavLink } from '../components/layout';
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
      });

      if (error) throw error;

      await signOutUser();

      setAuthStatus('success');
    },
  });

  const description = authStatus === 'error' ? '검증 실패' : !captchaToken ? '확인 중...' : '가입하기';
  const idErrorMsg = errorForm.get('id') ?? '';
  const pwdErrorMsg = errorForm.get('password') ?? '';
  const confirmPwdErrorMsg = errorForm.get('confirmPassword') ?? '';

  return (
    <CaptchaContainer>
      {/* 상단 */}
      <AuthFormTitle text='회원가입' />

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
            placeholder='이메일'
            value={formState.id}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <FormInputCaption text={idErrorMsg} hasError={Boolean(idErrorMsg)} />

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
          <FormInputCaption text={pwdErrorMsg} hasError={Boolean(pwdErrorMsg)} />

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
          <FormInputCaption text={confirmPwdErrorMsg} hasError={Boolean(confirmPwdErrorMsg)} />
        </FormInputBox>

        <AuthFormSubmitButton text={description} disabled={disabled} />
      </AuthForm>

      {/* 하단 */}
      <nav>
        <AuthNavLink text='돌아가기' to={PATHS.AUTH.LOGIN} />
      </nav>
    </CaptchaContainer>
  );
}
