/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_CLIENT_URL: string;
  readonly VITE_SITE_KEY: string;
  // 다른 환경 변수들에 대한 타입 정의
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  onloadTurnstileCallback?: () => void;
  turnstile?: Turnstile;
}

const turnstile: Turnstile;

interface Turnstile {
  render: (
    container: string | HTMLElement,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      'error-callback'?: () => void;
      'expired-callback'?: () => void;
      theme?: 'light' | 'dark' | 'auto';
      language?: string;
      action?: string;
      cData?: string;
    }
  ) => string | void;

  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}
