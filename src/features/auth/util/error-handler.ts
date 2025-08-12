import { ZodError, ZodIssue } from 'zod';
import { AuthError } from '@supabase/supabase-js';

import { authErrorHandler } from './auth-error-handler';

export type ShowMessage = (msg: string) => void;
type setInputMessage = (issues: ZodIssue[]) => void;
export type ActionFn = () => void;

export class AuthErrorHandler {
  authHandler: Record<string, () => void>;

  constructor(
    private showMessage: ShowMessage,
    private setInputMessage: setInputMessage,
    private captchaRefresh: ActionFn
  ) {
    this.authHandler = authErrorHandler({ showMessage: this.show, captchaRefresh: this.captchaRefresh });
  }

  public handle(error: unknown) {
    // Zod
    if (error instanceof ZodError) {
      this.setInputMessage(error.issues);
      return;
    }

    // Supabase Auth
    if (error instanceof AuthError) {
      const handler = this.authHandler[String(error.code)];
      if (handler) {
        handler();
      } else {
        this.show(`알 수 없는 오류가 발생했습니다. (${error.code})`);
      }
      return;
    }
  }

  private show = (msg: string) => {
    this.showMessage(msg);
  };
}
