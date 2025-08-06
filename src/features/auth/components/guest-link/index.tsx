import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import supabase from '@/lib/supabase';

import styles from './index.module.css';

// TODO: 상태 분리
const clickStateAtom = atom(false);
export const captchaTokenAtom = atom('');
const setCaptchaTokenAtom = atom(null, (_, set, token: string) => {
  set(captchaTokenAtom, token);
});

export default function GuestLink() {
  const [isClick, setClick] = useAtom(clickStateAtom);
  const captchaToken = useAtomValue(captchaTokenAtom);
  const setCaptchaToken = useSetAtom(setCaptchaTokenAtom);

  // TODO: 방문자 접속 로직 구현
  const handleGuestLogin = async () => {
    if (isClick) {
      alert('처리 중입니다.'); // TODO: UI 입력창 반응 제한
      return;
    }
    setClick(true);

    // 로그인
    const res = await supabase.auth.signInAnonymously({
      options: {
        captchaToken,
      },
    });

    if (res.error) {
      console.error(res.error.message);
      throw new Error(res.error.message);
    }
  };

  /** 캡챠 실행 */
  useEffect(() => {
    window.onloadTurnstileCallback = function () {
      if (typeof turnstile !== 'undefined') {
        turnstile.render('.cf-turnstile', {
          sitekey: import.meta.env.VITE_SITE_KEY,
          theme: 'light', // TODO: 사용자 테마
          language: 'ko', // TODO: 사용자 언어
          callback: (token: string) => setCaptchaToken(token),
        });
      }
    };

    return () => {
      delete window.onloadTurnstileCallback;
    };
  }, [setCaptchaToken]);

  return (
    <>
      <div className={styles.box}>
        {captchaToken && (
          <button type='button' className={styles.guestLink} onClick={handleGuestLogin}>
            방문자로 접속하기
          </button>
        )}
      </div>

      <div className='cf-turnstile' style={{ position: 'absolute', bottom: 160 }}></div>
    </>
  );
}
