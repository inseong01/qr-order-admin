import { useAtomValue, useSetAtom } from 'jotai';
import { ReactNode, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import ToastNotification from '@/features/alert/toast';
import { languageAtom, themeAtom } from '@/store/settings-atom';

import styles from './index.module.css';
import GuestLink from '../../guest-link';
import { CAPTCHA_PASS_TEST_KEY } from '../../const';
import { authStatusAtom, captchaTokenAtom, setCaptchaTokenAtom } from '../../store/auth-atom';

const testEnvKey = window.TEST_SITEKEY ?? CAPTCHA_PASS_TEST_KEY;
const devEnvKey = import.meta.env.VITE_SITE_KEY;
const prodEnvKey = import.meta.env.VITE_SITE_KEY;

const envKey = import.meta.env.PROD ? prodEnvKey : devEnvKey;

type ConatinerProps = {
  children: ReactNode;
};

export default function CaptchaContainer({ children }: ConatinerProps) {
  const setCaptchaToken = useSetAtom(setCaptchaTokenAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const { '*': params } = useParams();

  const widgetId = useRef('');
  const theme = useAtomValue(themeAtom);
  const language = useAtomValue(languageAtom);
  const sitekey = import.meta.env.MODE !== 'test' ? envKey : testEnvKey;
  const captchaToken = useAtomValue(captchaTokenAtom);

  /** 캡챠 실행 */
  useEffect(() => {
    if (captchaToken) return; // 토큰이 있으면 렌더링 안 함

    // Turnstile이 이미 로드되었는지 확인
    const renderWidget = () => {
      if (typeof turnstile === 'undefined') return;
      if (widgetId.current) return;

      const id = turnstile.render('.cf-turnstile', {
        sitekey,
        theme,
        language,
        callback: (token) => {
          if (!token) {
            setAuthStatus('error');
            return;
          }
          setCaptchaToken(token);
          setAuthStatus('idle');
        },
        'error-callback': () => {
          setAuthStatus('error');
        },
      });

      if (id) widgetId.current = id;
    };

    // Turnstile 스크립트가 비동기 로드될 경우를 대비
    if (window.turnstile) {
      renderWidget();
    } else {
      const onLoad = () => renderWidget();
      window.addEventListener('turnstileLoad', onLoad);
      return () => {
        window.removeEventListener('turnstileLoad', onLoad);
      };
    }
  }, [captchaToken, sitekey, theme, language, setCaptchaToken, setAuthStatus]);

  // 컴포넌트 언마운트 시 제거
  useEffect(() => {
    return () => {
      if (widgetId.current) {
        turnstile.remove(widgetId.current);
        widgetId.current = '';
      }
    };
  }, []);

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
