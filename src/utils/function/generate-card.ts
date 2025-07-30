import { Order } from '@/lib/supabase/tables/order';
import { OrderItem } from '@/lib/supabase/tables/order-item';

type InitCardObj = {
  isStart: boolean;
  isEnd: boolean;
  header: {
    table: OrderItem['order']['table'];
    startAt: string;
  };
  main: { menu: OrderItem['menu']; quantity: number }[];
};

const createNewCard = (isStart: boolean = true): InitCardObj => ({
  isStart,
  isEnd: false,
  header: {
    table: { id: '', number: 0 },
    startAt: '',
  },
  main: [],
});

type generateCardLayoutArrProps = {
  order: Order[];
  orderItems: OrderItem[];
  maxHeight: number;
};

/**
 * 레이아웃 계산
 * - 카드 너비 calc(srceen width / 4 - 10px)
 *   -> gap: 10px;
 *
 * - 카드 높이
 *   - 헤더
 *     - 상단 여백
 *         첫 시작 25px
 *         넘어간 경우 45px
 *     - 높이 90px
 *     - 하단 공백 30px
 *
 *   - 메인
 *     - 메뉴
 *       - 높이 22px
 *       - 하단 공백 25px
 *       - 구분선 1px
 *
 *   - 푸터
 *     - 높이 54px
 *     - 하단 공백 25px
 */
export function generateCardLayoutArr({ order, orderItems, maxHeight }: generateCardLayoutArrProps) {
  // 주문 모음
  const ordersMap = new Map();
  orderItems.forEach((o) => {
    if (ordersMap.has(o.order.id)) {
      ordersMap.get(o.order.id).push(o);
    } else {
      ordersMap.set(o.order.id, [o]);
    }
  });

  /* 주문 목록 반복 필요, 중첩 반복문 필요 */
  console.log(ordersMap.values());

  let cardArr = [];
  for (const orderItem of orderItems) {
    let currentCardHeight = 0;
    let currentCard = createNewCard();

    // 헤더
    const startAt = currentCard.isStart ? findOrderStartAt({ order, orderItem }) : '';
    currentCard.header = { table: orderItem.order.table, startAt };

    const headerHeight = calculateHeader(currentCard.isStart);
    if (headerHeight + currentCardHeight > maxHeight) {
      cardArr.push(currentCard);

      currentCard = createNewCard(false);
      currentCard.header = { table: orderItem.order.table, startAt: '' };
      currentCardHeight = calculateHeader(false);
    }

    // 메인 계산
    const menuHeight = calculateMain();
    if (menuHeight + currentCardHeight > maxHeight) {
      cardArr.push(currentCard);

      currentCard = createNewCard(false);
      currentCard.header = { table: orderItem.order.table, startAt: '' };
      currentCardHeight = calculateHeader(false);
    }

    // 메뉴
    currentCard.main.push({ menu: orderItem.menu, quantity: orderItem.quantity });
    currentCardHeight += menuHeight;

    // 푸터
    const footerHeight = calculateFooter();
    if (currentCardHeight + footerHeight > maxHeight) {
      cardArr.push(currentCard);

      const footerCard = createNewCard(false);
      footerCard.header = { ...currentCard.header, startAt: '' };
      footerCard.isEnd = true;
      cardArr.push(footerCard);
    } else {
      currentCard.isEnd = true;
      cardArr.push(currentCard);
    }
  }

  // 배열 반환
  return cardArr;
}

type FindOrderStartAtProps = {
  order: Order[];
  orderItem: OrderItem;
};

/** 주문 시각 반환  */
function findOrderStartAt({ order, orderItem }: FindOrderStartAtProps) {
  return order.find((o) => o.id === orderItem.order.id)?.created_at ?? '';
}

/** 헤더 계산 */
function calculateHeader(isStart: boolean) {
  const CARD_PADDING_TOP_START = 25;
  const CARD_PADDING_TOP_NEXT = 45;
  const HEADER_HEIGHT = 90;
  const HEADER_PADDING_BOTTOM = 45;

  const initCardHeaderHeight = CARD_PADDING_TOP_START + HEADER_HEIGHT + HEADER_PADDING_BOTTOM;
  const nextCardHeaderHeight = CARD_PADDING_TOP_NEXT;

  return isStart ? initCardHeaderHeight : nextCardHeaderHeight;
}

/** 메인 계산 */
function calculateMain() {
  const MENU_HEIGHT = 22;
  const MENU_PADDING_BOTTOM = 25;
  const DIVISION_LINE = 1;

  return MENU_HEIGHT + MENU_PADDING_BOTTOM + DIVISION_LINE;
}

/** 푸터 계산 */
function calculateFooter() {
  const FOOTER_HEIGHT = 54;
  const FOOTER_PADDING_TOP = 25; // 메인과 푸터 최소 여백
  const FOOTER_PADDING_BOTTOM = 25;

  return FOOTER_HEIGHT + FOOTER_PADDING_TOP + FOOTER_PADDING_BOTTOM;
}
