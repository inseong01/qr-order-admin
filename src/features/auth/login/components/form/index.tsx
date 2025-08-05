import { useAtomValue } from 'jotai';

import validate from '@/utils/function/validate';
import Caption from '@/features/auth/components/caption';
import useAuthForm from '@/features/auth/hooks/use-auth-form';

import { errorFormAtom, loginFormAtom } from '../../../store/atom';
import styles from './index.module.css';

/**
 * 아이디, 비밀번호 입력 및 로그인 버튼을 포함하는 폼 컴포넌트
 */
export default function LoginForm() {
  const errorForm = useAtomValue(errorFormAtom);

  const { formState, isLoading, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: loginFormAtom,
    validationSchema: validate.schema.login,
    onSubmit: async (data) => {
      // TODO: Supabase 로그인 로직 구현
      console.log('Submitting login data:', data);
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
          className={styles.input}
          placeholder='비밀번호'
          value={formState.password}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        {!!errorForm.get('password') && <Caption text={errorForm.get('password')} />}
      </div>

      <button type='submit' className={styles.button} disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
