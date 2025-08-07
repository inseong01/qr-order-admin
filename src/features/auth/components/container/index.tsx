import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router';

import { languageAtom, themeAtom } from '@/store/settings-atom';
import { captchaTokenAtom, firstLoadStateAtom, setCaptchaTokenAtom } from '../../store/token-atom';
import GuestLink from '../guest-link';
import styles from './index.module.css';

type ConatinerProps = {
  children: ReactNode;
};

export default function AuthContainer({ children }: ConatinerProps) {
  const [isFirstLoad, setFirstLoadState] = useAtom(firstLoadStateAtom);
  const captchaToken = useAtomValue(captchaTokenAtom);
  const language = useAtomValue(languageAtom);
  const theme = useAtomValue(themeAtom);
  const setCaptchaToken = useSetAtom(setCaptchaTokenAtom);
  const { '*': params } = useParams();

  /** 캡챠 실행 */
  useEffect(() => {
    if (captchaToken) return;

    setFirstLoadState(false);

    window.onloadTurnstileCallback = function () {
      if (typeof turnstile === 'undefined') return;
      if (!isFirstLoad) return;
      turnstile.render('.cf-turnstile', {
        sitekey: import.meta.env.VITE_SITE_KEY,
        theme,
        language,
        callback: (token: string) => {
          setCaptchaToken(token);
        },
      });
    };
    window.onloadTurnstileCallback();

    return () => {
      delete window.onloadTurnstileCallback;
    };
  }, [params, isFirstLoad, captchaToken, setCaptchaToken]);

  return (
    <div className={styles.container}>
      {/* 폼 컨테이너 */}
      <div className={styles.formBox}>{children}</div>

      {/* 방문자 접속하기 */}
      <GuestLink captchaToken={captchaToken} />

      {/* 캡챠 */}
      <div className='cf-turnstile' style={{ position: 'absolute', bottom: 160 }}></div>
    </div>
  );
}
