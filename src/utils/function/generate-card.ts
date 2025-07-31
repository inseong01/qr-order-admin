import { Order } from '@/lib/supabase/tables/order';
import { OrderItem } from '@/lib/supabase/tables/order-item';

type generateCardLayoutArrProps = {
  orders: Order[];
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
export function generateCardLayoutArr({ orders, orderItems, maxHeight }: generateCardLayoutArrProps) {
  // 주문 모음
  const ordersMap = buildOrdersMap(orderItems);
  const allOrders = ordersMap.values().toArray();

  let cardArr = [];
  for (const tableOrder of allOrders) {
    let currentCardHeight = 0;
    let currentCard = createNewCard(true, tableOrder[0]);

    for (const orderItem of tableOrder) {
      // 헤더
      const startAt = currentCard.isStart ? findOrderStartAt({ orders, orderItem }) : '';
      const orderNumber = orderItem.order.order_number;
      currentCard.isDone = orderItem.order.is_done;
      currentCard.header = { table: orderItem.order.table, startAt, orderNumber };

      const headerHeight = calculateHeader(currentCard.isStart);
      if (headerHeight + currentCardHeight > maxHeight) {
        cardArr.push(currentCard);

        currentCard = createNewCard(false, tableOrder[0]);
        currentCard.isDone = orderItem.order.is_done;
        currentCard.header = { table: orderItem.order.table, startAt: '', orderNumber };
        currentCardHeight = calculateHeader(false);
      }

      // 메인 계산
      const menuHeight = calculateMain();
      if (menuHeight + currentCardHeight > maxHeight) {
        cardArr.push(currentCard);

        currentCard = createNewCard(false, tableOrder[0]);
        currentCard.isDone = orderItem.order.is_done;
        currentCard.header = { table: orderItem.order.table, startAt: '', orderNumber };
        currentCardHeight = calculateHeader(false);
      }

      // 메뉴
      currentCard.main.push({ menu: orderItem.menu, quantity: orderItem.quantity });
      currentCardHeight += menuHeight;
    }

    // 푸터
    const footerHeight = calculateFooter();
    if (currentCardHeight + footerHeight > maxHeight) {
      cardArr.push(currentCard);

      const footerCard = createNewCard(false, tableOrder[0]);
      footerCard.header = { ...currentCard.header, startAt: '' };
      currentCard.isDone = cardArr.at(-1)?.isDone ?? null;
      footerCard.isEnd = true;
      cardArr.push(footerCard);
    } else {
      currentCard.footer.orderId = tableOrder[0].order.id;
      currentCard.isEnd = true;
      cardArr.push(currentCard);
    }
  }

  // 배열 반환
  return cardArr;
}

export type CardObj = {
  isStart: boolean;
  isEnd: boolean;
  isDone: boolean | null;
  header: {
    table: OrderItem['order']['table'];
    startAt: string;
    orderNumber: number;
  };
  main: { menu: OrderItem['menu']; quantity: number }[];
  footer: {
    orderId: string;
  };
};

/** 새로운 주문 카드 생성 */
function createNewCard(isStart: boolean = true, tableOrder: OrderItem): CardObj {
  const isDone = tableOrder.order.is_done;
  const tableId = tableOrder.order.table.id;
  const orderNumber = tableOrder.order.order_number;
  const orderId = tableOrder.order.id;

  return {
    isStart,
    isEnd: false,
    isDone,
    header: {
      table: { id: tableId, number: 0 },
      startAt: '',
      orderNumber,
    },
    main: [],
    footer: {
      orderId,
    },
  };
}

type FindOrderStartAtProps = {
  orders: Order[];
  orderItem: OrderItem;
};

/** 주문 id 기준 맵핑 */
export function buildOrdersMap(orderItems: OrderItem[]): Map<OrderItem['order']['id'], OrderItem[]> {
  const ordersMap = new Map();

  orderItems.forEach((o) => {
    if (ordersMap.has(o.order.id)) {
      ordersMap.get(o.order.id).push(o);
    } else {
      ordersMap.set(o.order.id, [o]);
    }
  });
  return ordersMap;
}

/** 주문 시각 반환  */
export function findOrderStartAt({ orders, orderItem }: FindOrderStartAtProps) {
  return orders.find((o) => o.id === orderItem.order.id)?.created_at ?? '';
}

/** 헤더 계산 */
export function calculateHeader(isStart: boolean) {
  const CARD_PADDING_TOP_START = 25;
  const CARD_PADDING_TOP_NEXT = 45;
  const HEADER_HEIGHT = 90;
  const HEADER_PADDING_BOTTOM = 45;

  const initCardHeaderHeight = CARD_PADDING_TOP_START + HEADER_HEIGHT + HEADER_PADDING_BOTTOM;
  const nextCardHeaderHeight = CARD_PADDING_TOP_NEXT;

  return isStart ? initCardHeaderHeight : nextCardHeaderHeight;
}

/** 메인 계산 */
export function calculateMain() {
  const MENU_HEIGHT = 22;
  const MENU_PADDING_BOTTOM = 25;
  const DIVISION_LINE = 1;

  return MENU_HEIGHT + MENU_PADDING_BOTTOM + DIVISION_LINE;
}

/** 푸터 계산 */
export function calculateFooter() {
  const FOOTER_HEIGHT = 54;
  const FOOTER_PADDING_TOP = 25; // 메인과 푸터 최소 여백
  const FOOTER_PADDING_BOTTOM = 25;

  return FOOTER_HEIGHT + FOOTER_PADDING_TOP + FOOTER_PADDING_BOTTOM;
}
