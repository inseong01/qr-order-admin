/**
 * @description 카드의 헤더 영역 높이를 계산 주문의 첫 카드인지에 따라 높이 다름
 * @param isStart 주문의 첫 번째 카드 여부
 * @returns 계산된 헤더의 높이 (px)
 */
export function calculateHeader(isStart: boolean) {
  const CARD_PADDING_TOP_START = 25;
  const CARD_PADDING_TOP_NEXT = 45;
  const HEADER_HEIGHT = 88;
  const HEADER_GAP = 30;

  // 첫 카드는 헤더 가짐
  // 이어지는 카드는 헤더가 없음으로 첫 카드와 높이 다름
  const initCardHeaderHeight = CARD_PADDING_TOP_START + HEADER_HEIGHT + HEADER_GAP;
  const nextCardHeaderHeight = CARD_PADDING_TOP_NEXT;

  return isStart ? initCardHeaderHeight : nextCardHeaderHeight;
}

/**
 * @description 카드의 메인 영역에 들어가는 단일 메뉴 항목의 높이 계산
 * @returns  메뉴 항목 하나의 높이 (px)
 */
export function calculateMain() {
  const MENU_HEIGHT = 43;
  const DIVISION_LINE = 1;
  const MENU_PADDING_BOTTOM = 25;

  return MENU_HEIGHT + MENU_PADDING_BOTTOM + DIVISION_LINE;
}

/**
 * @description 카드의 푸터 영역 높이 계산
 * @returns  계산된 푸터의 높이 (px)
 */
export function calculateFooter() {
  const FOOTER_HEIGHT = 54;
  const FOOTER_PADDING_BOTTOM = 25;

  return FOOTER_HEIGHT + FOOTER_PADDING_BOTTOM;
}
