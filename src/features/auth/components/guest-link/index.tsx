import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import supabase from '@/lib/supabase';
import { ROUTES } from '@/constants/routes';
import { PATHS } from '@/constants/paths';

import { setSuccessStateAtom, successStateAtom } from '../../store/form-atom';
import styles from './index.module.css';

const clickStateAtom = atom(false);

type GuestLinkProps = {
  captchaToken: string;
};

export default function GuestLink({ captchaToken }: GuestLinkProps) {
  const [isClick, setClick] = useAtom(clickStateAtom);
  const isSuccess = useAtomValue(successStateAtom);
  const setSuccessState = useSetAtom(setSuccessStateAtom);
  const { '*': params } = useParams();
  const navigate = useNavigate();

  /** 익명 사용자 로그인 */
  const handleGuestLogin = async () => {
    // UI 입력창 반응 제한
    if (isClick) return alert('잠시만 기다려주세요.');
    setClick(true);

    // 지연
    await new Promise((resolve) => setTimeout(resolve, 700));

    // 로그인
    const { error } = await supabase.auth.signInAnonymously({
      options: {
        captchaToken,
      },
    });

    // 성공 처리
    setSuccessState(true);

    // 오류 처리
    if (error) throw error;
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate(PATHS.ROOT, { replace: true });
      }, 1500);
    }
  }, [isSuccess, navigate]);

  const openGuestLink = params?.includes(ROUTES.LOGIN) && captchaToken;

  return (
    <div className={styles.box}>
      {openGuestLink && (
        <button type='button' className={styles.guestLink} onClick={handleGuestLogin}>
          방문자로 접속하기
        </button>
      )}
    </div>
  );
}
