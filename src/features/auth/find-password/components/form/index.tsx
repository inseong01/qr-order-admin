import { useAtomValue } from 'jotai';

import supabase from '@/lib/supabase';
import validate from '@/utils/function/validate';
import Caption from '@/features/auth/components/caption';
import useAuthForm from '@/features/auth/hooks/use-auth-form';
import { captchaTokenAtom } from '@/features/auth/store/token-atom';
import { localResetPasswordUrl, productResetPasswordUrl } from '@/features/auth/const';

import { errorFormAtom, findPwdFormAtom } from '../../../store/form-atom';
import styles from './index.module.css';

export default function FindPasswordForm() {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const errorForm = useAtomValue(errorFormAtom);
  const { formState, isLoading, isSuccess, handleInputChange, handleSubmit } = useAuthForm({
    formAtom: findPwdFormAtom,
    validationSchema: validate.schema.findPassword,
    onSubmit: async (formData) => {
      // 비밀번호 초기화 요청
      const redirectTo = import.meta.env.DEV ? localResetPasswordUrl : productResetPasswordUrl;
      const { error } = await supabase.auth.resetPasswordForEmail(formData.id, { captchaToken, redirectTo });

      // 지연
      await new Promise((resolve) => setTimeout(resolve, 700));

      // 오류 처리
      if (error) throw error;

      // 알림
      alert('메일을 확인해주세요.');
    },
  });

  const disabled = isLoading || !captchaToken || isSuccess;
  const description = !captchaToken ? '확인 중...' : '입력하기';

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
          disabled={disabled}
        />
        {!!errorForm.get('id') && <Caption text={errorForm.get('id')} />}
      </div>

      <button type='submit' className={styles.button} disabled={disabled}>
        {description}
      </button>
    </form>
  );
}
