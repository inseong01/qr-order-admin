import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router';

import supabase from '@/lib/supabase';
import { PATHS } from '@/constants/paths';
import validate from '@/utils/function/validate';
import Caption from '@/features/auth/components/caption';
import useAuthForm from '@/features/auth/hooks/use-auth-form';
import { captchaTokenAtom } from '@/features/auth/store/token-atom';

import { errorFormAtom, resetPwdFormAtom } from '../../../store/form-atom';
import styles from './index.module.css';

export default function ResetPasswordForm() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const navigate = useNavigate();
  const { formState, isLoading, isSuccess, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: resetPwdFormAtom,
    validationSchema: validate.schema.resetPassword,
    onSubmit: async (formData) => {
      // 비밀번호 수정
      const { error } = await supabase.auth.updateUser({ password: formData.password });

      // 지연
      await new Promise((resolve) => setTimeout(resolve, 700));

      // 오류 처리
      if (error) throw error;

      // 알림
      alert('수정되었습니다!');

      // 리다이렉트
      navigate(PATHS.AUTH.LOGIN, { replace: true });
    },
  });

  const disabled = isLoading || !captchaToken || isSuccess;
  const description = !captchaToken ? '확인 중...' : '수정하기';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputBox}>
        <input
          required
          type='password'
          name='password'
          aria-invalid={!!errorForm.get('password')}
          data-invalid={!!errorForm.get('password')}
          className={styles.input}
          placeholder='새로운 비밀번호를 입력해주세요.'
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
