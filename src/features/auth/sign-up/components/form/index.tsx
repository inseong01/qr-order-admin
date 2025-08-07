import { useAtomValue } from 'jotai';

import supabase from '@/lib/supabase';
import validate from '@/utils/function/validate';
import Caption from '@/features/auth/components/caption';
import useAuthForm from '@/features/auth/hooks/use-auth-form';
import { captchaTokenAtom } from '@/features/auth/store/token-atom';

import { errorFormAtom, signupFormAtom } from '../../../store/form-atom';
import { PWD_MAX, PWD_MIN } from '../../../const';
import styles from './index.module.css';

export default function SignUpForm() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const { formState, isLoading, isSuccess, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: signupFormAtom,
    validationSchema: validate.schema.signup,
    onSubmit: async (formData) => {
      // 회원가입
      const { error } = await supabase.auth.signUp({
        email: formData.id,
        password: formData.password,
        options: { captchaToken, data: { signup_origin: 'qr_order_adim', is_approved: false } },
      });

      // 오류 처리
      if (error) throw error;
    },
  });

  const disabled = isLoading || !captchaToken || isSuccess;
  const description = !captchaToken ? '확인 중...' : '가입하기';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputBox}>
        <input
          required
          type='email'
          name='id'
          aria-invalid={!!errorForm.get('id')}
          data-invalid={!!errorForm.get('id')}
          className={styles.input}
          placeholder='이메일'
          value={formState.id}
          onChange={handleInputChange}
          disabled={disabled}
        />
        {!!errorForm.get('id') && <Caption text={errorForm.get('id')} />}

        <input
          required
          type='password'
          name='password'
          aria-invalid={!!errorForm.get('password')}
          data-invalid={!!errorForm.get('password')}
          minLength={PWD_MIN}
          maxLength={PWD_MAX}
          className={styles.input}
          placeholder='비밀번호'
          value={formState.password}
          onChange={handleInputChange}
          disabled={disabled}
        />
        {!!errorForm.get('password') && <Caption text={errorForm.get('password')} />}

        <input
          required
          type='password'
          name='confirmPassword'
          aria-invalid={!!errorForm.get('confirmPassword')}
          data-invalid={!!errorForm.get('confirmPassword')}
          className={styles.input}
          placeholder='비밀번호 확인'
          value={formState.confirmPassword}
          onChange={handleInputChange}
          disabled={disabled}
        />
        {!!errorForm.get('confirmPassword') && <Caption text={errorForm.get('confirmPassword')} />}
      </div>

      <button type='submit' className={styles.button} disabled={disabled}>
        {description}
      </button>
    </form>
  );
}
