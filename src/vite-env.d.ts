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
  // captcha 타입 설정
  turnstile?: {
    render: (
      container: HTMLElement,
      options: {
        sitekey: string;
        language: string;
        theme: string;
        callback: (token: string) => void;
        'error-callback': (code: stirng) => void;
      }
    ) => void;
  };
}
