import { useAtomValue, useSetAtom } from 'jotai';
import { ReactNode, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import ToastNotification from '@/features/alert/toast';
import { languageAtom, themeAtom } from '@/store/settings-atom';

import styles from './index.module.css';
import GuestLink from '../guest-link';
import { CAPTCHA_PASS_TEST_KEY } from '../../const';
import { authStatusAtom, captchaTokenAtom, setCaptchaTokenAtom } from '../../store/auth-atom';

type ConatinerProps = {
  children: ReactNode;
};

export default function AuthContainer({ children }: ConatinerProps) {
  const captchaToken = useAtomValue(captchaTokenAtom);
  const language = useAtomValue(languageAtom);
  const theme = useAtomValue(themeAtom);
  const setCaptchaToken = useSetAtom(setCaptchaTokenAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const { '*': params } = useParams();
  const widgetId = useRef('');
  const sitekeyToUse =
    import.meta.env.MODE !== 'test' ? import.meta.env.VITE_SITE_KEY : (window.TEST_SITEKEY ?? CAPTCHA_PASS_TEST_KEY);

  /** 캡챠 실행 */
  useEffect(() => {
    if (captchaToken) {
      turnstile.remove(widgetId?.current ?? '');
      widgetId.current = '';
      return;
    }

    window.onloadTurnstileCallback = () => {
      if (typeof turnstile === 'undefined') return;
      if (widgetId.current) return;

      const id = turnstile.render('.cf-turnstile', {
        sitekey: sitekeyToUse,
        theme,
        language,
        callback: (token) => {
          if (!token) {
            setAuthStatus('error');
          }
          setCaptchaToken(token);
          setAuthStatus('idle');
        },
        'error-callback': () => {
          setAuthStatus('error');
        },
      });

      if (id) {
        widgetId.current = id;
      }
    };
    window.onloadTurnstileCallback();

    return () => {
      delete window.onloadTurnstileCallback;
    };
  }, [params, captchaToken, setCaptchaToken]);

  const bottom = params === 'signup' ? 130 : 160;

  return (
    <div className={styles.container}>
      {/* 폼 컨테이너 */}
      <div className={styles.formBox}>{children}</div>

      {/* 방문자 접속하기 */}
      {params === 'login' && <GuestLink captchaToken={captchaToken} />}

      {/* 캡챠 */}
      <div className='cf-turnstile' style={{ position: 'absolute', bottom }}></div>

      {/* 토스트 알림 */}
      <ToastNotification />
    </div>
  );
}
