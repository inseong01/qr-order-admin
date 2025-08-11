import { useAtomValue } from 'jotai';

import supabase from '@/lib/supabase';
import validate from '@/utils/function/validate';
import Caption from '@/features/auth/components/caption';
import useAuthForm from '@/features/auth/hooks/use-auth-form';
import { captchaTokenAtom } from '@/features/auth/store/token-atom';

import { errorFormAtom, loginFormAtom } from '../../../store/form-atom';
import styles from './index.module.css';

/**
 * 아이디, 비밀번호 입력 및 로그인 버튼을 포함하는 폼 컴포넌트
 */
export default function LoginForm() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const { formState, isLoading, isSuccess, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: loginFormAtom,
    validationSchema: validate.schema.login,
    onSubmit: async (formData) => {
      // 로그인
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.id,
        password: formData.password,
        options: { captchaToken },
      });

      // 오류 처리
      if (error) throw error;
    },
  });

  const disabled = isLoading || !captchaToken || isSuccess;
  const description = isSuccess ? '로그인 성공!' : !captchaToken ? '확인 중...' : '로그인';

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
          className={styles.input}
          placeholder='비밀번호'
          value={formState.password}
          onChange={handleInputChange}
          disabled={disabled}
        />
        {!!errorForm.get('password') && <Caption text={errorForm.get('password')} />}
      </div>

      <button type='submit' className={styles.button} disabled={disabled}>
        {description}
      </button>
    </form>
  );
}
