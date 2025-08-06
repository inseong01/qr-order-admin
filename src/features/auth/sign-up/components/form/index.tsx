import { useAtomValue } from 'jotai';

import validate from '@/utils/function/validate';
import Caption from '@/features/auth/components/caption';
import useAuthForm from '@/features/auth/hooks/use-auth-form';

import { errorFormAtom, signupFormAtom } from '../../../store/form-atom';
import { PWD_MAX, PWD_MIN } from '../../../const';
import styles from './index.module.css';

export default function SignUpForm() {
  const errorForm = useAtomValue(errorFormAtom);

  const { formState, isLoading, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: signupFormAtom,
    validationSchema: validate.schema.signup,
    onSubmit: async (data) => {
      // TODO: Supabase 회원가입 로직 구현
      console.log('Submitting signup data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    },
  });

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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
        {!!errorForm.get('confirmPassword') && <Caption text={errorForm.get('confirmPassword')} />}
      </div>

      <button type='submit' className={styles.button} disabled={isLoading}>
        {isLoading ? '회원가입 중...' : '회원가입'}
      </button>
    </form>
  );
}
