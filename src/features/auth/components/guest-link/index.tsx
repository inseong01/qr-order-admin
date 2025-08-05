import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRef } from 'react';

import supabase from '@/lib/supabase';

import styles from './index.module.css';

const clickStateAtom = atom(false);
const captchaTokenAtom = atom('');
const setCaptchaTokenAtom = atom(null, (_, set, token: string) => {
  set(captchaTokenAtom, token);
});

export default function GuestLink() {
  const [isClick, setClick] = useAtom(clickStateAtom);
  const captchaToken = useAtomValue(captchaTokenAtom);
  const setCaptchaToken = useSetAtom(setCaptchaTokenAtom);
  const containerRef = useRef(null);

  // TODO: 방문자 접속 로직 구현
  const handleGuestLogin = async () => {
    if (isClick) return;
    setClick(true);
    console.log('방문자로 접속');

    // capchatoken 발급 - Turnstile 스크립트 로드
    const loadTurnstile = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Turnstile script.'));
        document.body.appendChild(script);
      });
    };

    await loadTurnstile();

    if (window.turnstile && containerRef.current) {
      window.turnstile.render(containerRef.current, {
        sitekey: import.meta.env.VITE_SITE_KEY,
        language: 'ko', // TODO: 사용자 언어
        theme: 'light', // TODO: 사용자 테마
        callback: async (token: string) => {
          setCaptchaToken(token);
          console.log('Challenge Success:', token);

          const res = await supabase.auth.signInAnonymously({
            options: {
              captchaToken: token,
            },
          });
          console.log(res);
        },
        'error-callback': (code) => {
          console.log('error', code); // TODO: 에러 반환 동작 확인
        },
      });
    }

    console.log(2, captchaToken);
  };

  return (
    <>
      {/* 방문자 접속 버튼 */}
      <button type='button' className={styles.guestLink} onClick={handleGuestLogin}>
        방문자로 접속하기
      </button>

      {isClick && <div ref={containerRef} className='cf-turnstile'></div>}
    </>
  );
}
