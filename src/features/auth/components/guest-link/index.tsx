import { useState } from 'react';

import supabase from '@/lib/supabase';
import validate from '@/utils/function/validate';

import styles from './index.module.css';
import useAuthForm from '../../hooks/use-auth-form';
import { captchaTokenAtom } from '../../store/token-atom';

type GuestLinkProps = {
  captchaToken: string;
};

export default function GuestLink({ captchaToken }: GuestLinkProps) {
  const [isClick, setClick] = useState(false);
  const { isLoading, isSuccess, handleSubmit } = useAuthForm({
    formAtom: captchaTokenAtom,
    validationSchema: validate.schema.captchaToken,
    onSubmit: async () => {
      // 방문자 접속 요청
      if (isClick) return alert('처리중입니다. 잠시만 기다려주세요.');
      setClick(true);

      // 로그인
      const { error } = await supabase.auth.signInAnonymously({
        options: {
          captchaToken,
        },
      });

      // 오류 처리
      if (error) throw error;
    },
  });

  const disabled = isLoading || !captchaToken || isSuccess;

  return (
    <form className={styles.box} onSubmit={handleSubmit}>
      <button type='submit' className={styles.guestLink} disabled={disabled}>
        방문자로 접속하기
      </button>
    </form>
  );
}
