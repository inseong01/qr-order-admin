import validate from '@/utils/function/validate';

import styles from './index.module.css';
import useAuthForm from '../../hooks/use-auth-form';
import useDisabledState from '../../hooks/use-disabled';
import { captchaTokenAtom } from '../../store/auth-atom';
import { signInAnonymously } from '../../util/auth-supabase-api';

type GuestLinkProps = {
  captchaToken: string;
};

export default function GuestLink({ captchaToken }: GuestLinkProps) {
  const { disabled, authStatus } = useDisabledState();
  const { handleSubmit } = useAuthForm({
    formAtom: captchaTokenAtom,
    validationSchema: validate.schema.captchaToken,
    onSubmit: async () => {
      // 방문자 접속 요청
      if (authStatus === 'loading') return alert('처리중입니다. 잠시만 기다려주세요.');

      // 로그인
      const { error } = await signInAnonymously(captchaToken);

      if (error) throw error;
    },
  });

  return (
    <form className={styles.box} onSubmit={handleSubmit}>
      <button type='submit' className={styles.guestLink} disabled={disabled}>
        방문자로 접속하기
      </button>
    </form>
  );
}
