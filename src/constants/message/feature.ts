export const FEATURE_MESSAGES = {
  category: {
    required: '분류명을 입력해주세요.',
    select: '분류를 선택해주세요.',
  },
  menu: {
    idRequired: '메뉴 아이디는 포함되어야 합니다.',
    categoryRequired: '메뉴 분류를 선택헤주세요.',
    nameRequired: '메뉴 이름을 입력해주세요.',
    priceInvalid: '가격은 0 이상의 숫자여야 합니다.',
    tagRequired: '태그를 선택해주세요.',
    imgInvalid: '올바르지 않은 이미지 주소입니다.',
  },
  order: {
    idRequired: '주문이 선택되지 않았습니다.',
  },
  image: {
    required: '파일을 선택해주세요.',
    sizeExceeded: (maxSizeMB: number) => `${maxSizeMB}MB 이하로 업로드해주세요.`,
    upload: '이미지 업로드 과정에서 오류가 발생했습니다.',
    processing: '이미지 처리 과정에서 오류가 발생했습니다.',
  },
} as const;
