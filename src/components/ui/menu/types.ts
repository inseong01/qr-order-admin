export type MenuFormInputs = {
  img_url: string; // 사진 주소
  name: string; // 음식명
  title: string; // 분류
  price: string; // 가격
  tag: string; // 판매 상태
};

export type MenuErrorFormKeys = Map<keyof MenuFormInputs, string>;
