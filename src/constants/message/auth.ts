export const AUTH_MESSAGES = {
  email: {
    required: '이메일을 입력해주세요.',
    invalid: '올바른 이메일 주소 형식이 아닙니다.',
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    min: (min: number) => `최소 ${min}자 이상이어야 합니다.`,
    max: (max: number) => `최대 ${max}자까지 가능합니다.`,
    invalid: '소문자, 대문자, 숫자, 특수문자가 포함되어야 합니다.',
    noBackslash: '\\ 특수문자는 사용할 수 없습니다.',
    letter: '소문자, 대문자가 포함되어야 합니다.',
    number: '숫자가 포함되어야 합니다.',
    special: '특수문자가 포함되어야 합니다.',
  },
  confirmPassword: {
    required: '비밀번호 확인은 필수 입력 항목입니다.',
    mismatch: '비밀번호가 일치하지 않습니다.',
  },
  captcha: {
    missing: '캡챠 토큰이 누락되었습니다.',
  },
} as const;
