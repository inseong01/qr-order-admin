import supabase from '@/lib/supabase';

/**
 * 이메일과 비밀번호로 사용자 로그인
 * @param email - 사용자 이메일
 * @param password - 사용자 비밀번호
 * @param captchaToken - 캡챠 토큰
 */
export async function signInWithEmailAndPassword(email: string, password: string, captchaToken: string) {
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });
  return res;
}

/**
 * 익명 사용자 로그인
 * @param captchaToken - 캡챠 토큰
 */
export async function signInAnonymously(captchaToken: string) {
  const res = await supabase.auth.signInAnonymously({
    options: { captchaToken, data: { signup_origin: 'qr_order_admin' } },
  });
  return res;
}

/**
 * 새로운 사용자 회원가입
 * @param email - 사용자 이메일
 * @param password - 사용자 비밀번호
 * @param captchaToken - 캡챠 토큰
 * @param userData - 사용자 메타데이터 (선택 사항)
 */
export async function signUpNewUser(email: string, password: string, captchaToken: string, userData?: object) {
  const res = await supabase.auth.signUp({
    email,
    password,
    options: { captchaToken, data: userData },
  });
  return res;
}

/**
 * 비밀번호 재설정 이메일 요청
 * @param email - 비밀번호를 재설정할 사용자 이메일
 * @param captchaToken - 캡챠 토큰
 * @param redirectToUrl - 비밀번호 재설정 후 리다이렉트될 URL
 */
export async function requestPasswordResetEmail(email: string, captchaToken: string, redirectToUrl: string) {
  const res = await supabase.auth.resetPasswordForEmail(email, { captchaToken, redirectTo: redirectToUrl });
  return res;
}

/**
 * 현재 로그인된 사용자의 비밀번호 업데이트
 * @param newPassword - 새로운 비밀번호
 */
export async function updateUserPassword(newPassword: string) {
  const res = await supabase.auth.updateUser({ password: newPassword });
  return res;
}

/**
 * 사용자 로그아웃
 */
export async function signOutUser() {
  const res = await supabase.auth.signOut();
  return res;
}

/**
 * 현재 인증 세션 가져오기
 */
export async function getAuthSession() {
  const res = await supabase.auth.getSession();
  return res;
}
