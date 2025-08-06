import { useAtomValue } from 'jotai';

import validate from '@/utils/function/validate';
import Caption from '@/features/auth/components/caption';
import useAuthForm from '@/features/auth/hooks/use-auth-form';

import { errorFormAtom, findPwdFormAtom } from '../../../store/form-atom';
import styles from './index.module.css';

export default function FindPasswordForm() {
  const errorForm = useAtomValue(errorFormAtom);

  const { formState, isLoading, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: findPwdFormAtom,
    validationSchema: validate.schema.findPassword,
    onSubmit: async (data) => {
      // TODO: Supabase 비밀번호 찾기 로직 구현
      console.log('Submitting find password data:', data);
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
          placeholder='가입 시 사용한 이메일'
          value={formState.id}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        {!!errorForm.get('id') && <Caption text={errorForm.get('id')} />}
      </div>

      <button type='submit' className={styles.button} disabled={isLoading}>
        {isLoading ? '확인 중...' : '확인'}
      </button>
    </form>
  );
}
