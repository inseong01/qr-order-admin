import { ActionFn, ShowMessage } from './error-handler';

type AuthErrorHandlerProps = {
  showMessage: ShowMessage;
  captchaRefresh: ActionFn;
};

export function authErrorHandler({ showMessage, captchaRefresh }: AuthErrorHandlerProps) {
  return {
    anonymous_provider_disabled: () => showMessage('익명 로그인은 비활성화되어 있습니다.'),
    bad_code_verifier: () => showMessage('코드 검증에 실패했습니다. 다시 시도해주세요.'),
    bad_json: () => showMessage('요청 형식이 올바르지 않습니다.'),
    bad_jwt: () => showMessage('인증 토큰이 유효하지 않습니다.'),
    bad_oauth_callback: () => showMessage('OAuth 콜백 데이터가 올바르지 않습니다.'),
    bad_oauth_state: () => showMessage('OAuth 상태 데이터가 잘못되었습니다.'),
    captcha_failed: () => {
      showMessage('캡차 인증에 실패했습니다. 다시 시도해주세요.');
      captchaRefresh();
    },
    conflict: () => showMessage('동시에 여러 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'),
    email_address_invalid: () => showMessage('유효하지 않은 이메일 주소입니다.'),
    email_address_not_authorized: () => showMessage('해당 이메일 주소로는 메일을 전송할 수 없습니다.'),
    email_conflict_identity_not_deletable: () => showMessage('다른 계정과 충돌하여 이메일을 변경할 수 없습니다.'),
    email_exists: () => showMessage('이미 등록된 이메일 주소입니다.'),
    email_not_confirmed: () => showMessage('이메일 인증 후 다시 시도해주세요.'),
    email_provider_disabled: () => showMessage('이메일/비밀번호 회원가입이 비활성화되어 있습니다.'),
    flow_state_expired: () => {
      showMessage('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    },
    flow_state_not_found: () => {
      showMessage('로그인 세션 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
    },
    hook_payload_invalid_content_type: () => showMessage('후크 요청의 Content-Type이 올바르지 않습니다.'),
    hook_payload_over_size_limit: () => showMessage('후크 요청 크기가 제한을 초과했습니다.'),
    hook_timeout: () => showMessage('후크 처리 시간이 초과되었습니다.'),
    hook_timeout_after_retry: () => showMessage('후크 재시도 후에도 시간이 초과되었습니다.'),
    identity_already_exists: () => showMessage('이미 연결된 인증 정보입니다.'),
    identity_not_found: () => showMessage('인증 정보를 찾을 수 없습니다.'),
    insufficient_aal: () => showMessage('더 높은 수준의 인증이 필요합니다. MFA를 진행해주세요.'),
    invalid_credentials: () => showMessage('이메일/비밀번호가 올바르지 않습니다.'),
    invite_not_found: () => showMessage('초대가 만료되었거나 이미 사용되었습니다.'),
    manual_linking_disabled: () => showMessage('수동 계정 연결이 비활성화되어 있습니다.'),
    mfa_challenge_expired: () => showMessage('MFA 인증 시간이 만료되었습니다. 다시 시도해주세요.'),
    mfa_factor_name_conflict: () => showMessage('동일한 이름의 MFA 인증 요소가 이미 있습니다.'),
    mfa_factor_not_found: () => showMessage('MFA 인증 요소를 찾을 수 없습니다.'),
    mfa_ip_address_mismatch: () => showMessage('MFA 등록은 동일한 IP에서 진행해야 합니다.'),
    mfa_phone_enroll_not_enabled: () => showMessage('전화번호 기반 MFA 등록이 비활성화되어 있습니다.'),
    mfa_phone_verify_not_enabled: () => showMessage('전화번호 기반 MFA 인증이 비활성화되어 있습니다.'),
    mfa_totp_enroll_not_enabled: () => showMessage('TOTP 기반 MFA 등록이 비활성화되어 있습니다.'),
    mfa_totp_verify_not_enabled: () => showMessage('TOTP 기반 MFA 인증이 비활성화되어 있습니다.'),
    mfa_verification_failed: () => showMessage('MFA 인증 코드가 잘못되었습니다.'),
    mfa_verification_rejected: () => showMessage('MFA 인증이 거부되었습니다.'),
    mfa_verified_factor_exists: () => showMessage('이미 등록된 MFA 인증 요소가 있습니다.'),
    mfa_web_authn_enroll_not_enabled: () => showMessage('WebAuthn 기반 MFA 등록이 비활성화되어 있습니다.'),
    mfa_web_authn_verify_not_enabled: () => showMessage('WebAuthn 기반 MFA 인증이 비활성화되어 있습니다.'),
    no_authorization: () => showMessage('인증 정보가 제공되지 않았습니다.'),
    not_admin: () => showMessage('관리자 권한이 없습니다.'),
    oauth_provider_not_supported: () => showMessage('지원하지 않는 OAuth 제공자입니다.'),
    otp_disabled: () => showMessage('OTP 로그인 기능이 비활성화되어 있습니다.'),
    otp_expired: () => showMessage('인증 코드가 만료되었습니다. 다시 요청해주세요.'),
    over_email_send_rate_limit: () => showMessage('이메일 전송 제한에 걸렸습니다. 잠시 후 시도해주세요.'),
    over_request_rate_limit: () => showMessage('요청 제한에 걸렸습니다. 잠시 후 시도해주세요.'),
    over_sms_send_rate_limit: () => showMessage('SMS 전송 제한에 걸렸습니다. 잠시 후 시도해주세요.'),
    phone_exists: () => showMessage('이미 등록된 전화번호입니다.'),
    phone_not_confirmed: () => showMessage('전화번호 인증 후 다시 시도해주세요.'),
    phone_provider_disabled: () => showMessage('전화번호/비밀번호 회원가입이 비활성화되어 있습니다.'),
    provider_disabled: () => showMessage('해당 OAuth 제공자가 비활성화되어 있습니다.'),
    provider_email_needs_verification: () => showMessage('OAuth 이메일 인증이 필요합니다.'),
    reauthentication_needed: () => showMessage('비밀번호 변경을 위해 다시 로그인해주세요.'),
    reauthentication_not_valid: () => showMessage('재인증 코드가 올바르지 않습니다.'),
    refresh_token_already_used: () => showMessage('이미 사용된 리프레시 토큰입니다.'),
    refresh_token_not_found: () => showMessage('리프레시 토큰을 찾을 수 없습니다.'),
    request_timeout: () => showMessage('요청 시간이 초과되었습니다.'),
    same_password: () => showMessage('현재 비밀번호와 다른 비밀번호를 사용해주세요.'),
    saml_assertion_no_email: () => showMessage('SAML 응답에 이메일이 없습니다.'),
    saml_assertion_no_user_id: () => showMessage('SAML 응답에 사용자 ID가 없습니다.'),
    saml_entity_id_mismatch: () => showMessage('SAML 엔터티 ID가 일치하지 않습니다.'),
    saml_idp_already_exists: () => showMessage('이미 등록된 SAML IdP입니다.'),
    saml_idp_not_found: () => showMessage('SAML IdP를 찾을 수 없습니다.'),
    saml_metadata_fetch_failed: () => showMessage('SAML 메타데이터를 가져오지 못했습니다.'),
    saml_provider_disabled: () => showMessage('SAML 제공자가 비활성화되어 있습니다.'),
    saml_relay_state_expired: () => showMessage('SAML 인증 상태가 만료되었습니다.'),
    saml_relay_state_not_found: () => showMessage('SAML 인증 상태를 찾을 수 없습니다.'),
    session_expired: () => {
      showMessage('세션이 만료되었습니다. 다시 로그인해주세요.');
    },
    session_not_found: () => showMessage('세션을 찾을 수 없습니다.'),
    signup_disabled: () => showMessage('회원가입이 비활성화되어 있습니다.'),
    single_identity_not_deletable: () => showMessage('유일한 인증 정보는 삭제할 수 없습니다.'),
    sms_send_failed: () => showMessage('SMS 전송에 실패했습니다.'),
    sso_domain_already_exists: () => showMessage('SSO 도메인이 이미 존재합니다.'),
    sso_provider_not_found: () => showMessage('SSO 제공자를 찾을 수 없습니다.'),
    too_many_enrolled_mfa_factors: () => showMessage('MFA 인증 요소 개수 제한을 초과했습니다.'),
    unexpected_audience: () => showMessage('JWT Audience가 올바르지 않습니다.'),
    unexpected_failure: () => showMessage('인증 서비스 오류가 발생했습니다.'),
    user_already_exists: () => showMessage('이미 존재하는 사용자입니다.'),
    user_banned: () => showMessage('해당 사용자는 차단 상태입니다.'),
    user_not_found: () => showMessage('사용자를 찾을 수 없습니다.'),
    user_sso_managed: () => showMessage('SSO로 관리되는 계정은 해당 필드를 수정할 수 없습니다.'),
    validation_failed: () => showMessage('입력값이 올바르지 않습니다.'),
    weak_password: () => showMessage('비밀번호가 안전하지 않습니다.'),
  };
}
