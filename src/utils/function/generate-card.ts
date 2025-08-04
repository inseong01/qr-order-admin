import { Order } from '@/lib/supabase/tables/order';
import { OrderItem } from '@/lib/supabase/tables/order-item';

type GenerateCardLayoutArrProps = {
  orders: Order[];
  orderItems: OrderItem[];
  maxHeight: number;
};

/**
 * @description 주문 데이터를 기반으로 영수증 카드 레이아웃을 동적으로 생성
 * 카드의 최대 높이를 고려하여, 내용이 넘칠 경우 여러 개의 카드로 분할
 *
 * @param orders - 전체 주문 목록
 * @param orderItems - 전체 주문 항목 목록
 * @param maxHeight - 카드의 최대 높이 (px)
 * @returns 생성된 카드 객체의 배열
 */
export function generateCardLayoutArr({ orders, orderItems, maxHeight }: GenerateCardLayoutArrProps) {
  // 주문 항목을 주문 ID 기준으로 그룹화하여 Map 생성
  const ordersMap = buildOrdersMap(orderItems);
  let cardArr: CardObj[] = [];
  // 다음 카드 높이가 전체 높이의 절반 차지하는지 여부를 나타내는 플래그
  let isNextCardTobeHalf = false;

  // 그룹화된 모든 주문에 대해 반복
  for (const order of orders) {
    const tableOrder = ordersMap.get(order.id) ?? [];
    let currentCardHeight = 0;
    // 새로운 카드 생성 (첫 카드이므로 isStart = true)
    let currentCard = createNewCard(true, order);

    // 주문 시작 및 업데이트 시간 찾음
    const startAt = currentCard.isStart ? findOrderStartAt({ orders, orderId: order.id }) : '';
    const updatedAt = currentCard.isStart ? findOrderUpdatedAt({ orders, orderId: order.id }) : '';
    const orderNumber = order.order_number;
    currentCard.isDone = order.is_done;
    currentCard.header = { table: order.table, startAt, updatedAt, orderNumber };

    /*
      카드 높이 유형 판단
      - 이전 카드의 높이가 절반이어서, 다음 카드가 절반 높이로 지정된 경우
    */
    if (isNextCardTobeHalf) {
      currentCardHeight = Math.floor(maxHeight / 2) - 5;
      currentCard.heightType = 'half';
      isNextCardTobeHalf = false;
    }

    /* 
      헤더 높이 계산 및 카드 분할
      - 헤더를 추가했을 때 최대 높이를 초과하는지 확인
    */
    const headerHeight = calculateHeader(currentCard.isStart);
    if (headerHeight + currentCardHeight > maxHeight) {
      // 초과하면, 현재 카드를 배열에 추가하고 새로운 카드를 생성
      cardArr.push(currentCard);

      currentCard = createNewCard(false, order);
      currentCard.isDone = order.is_done;
      currentCard.header = { table: order.table, startAt: '', updatedAt: '', orderNumber };
      currentCardHeight = calculateHeader(false);
    } else {
      // 초과하지 않으면, 현재 카드 높이에 헤더 높이를 더함
      currentCardHeight += headerHeight;
    }

    /* 
      메인(주문 항목) 높이 계산 및 카드 분할
      - 각 주문 항목을 순회하며 높이 계산
    */
    const menuHeight = calculateMain();
    for (const orderItem of tableOrder) {
      // 주문 항목을 추가했을 때 최대 높이를 초과하는지 확인
      if (menuHeight + currentCardHeight > maxHeight) {
        // 초과하면, 현재 카드를 배열에 추가하고 새로운 카드 생성
        cardArr.push(currentCard);

        currentCard = createNewCard(false, order);
        currentCard.isDone = order.is_done;
        currentCard.header = { table: order.table, startAt: '', updatedAt: '', orderNumber };
        currentCardHeight = calculateHeader(false);
      }

      // 현재 카드에 주문 항목을 추가하고 높이 업데이트
      currentCard.main.push({ menu: orderItem.menu, quantity: orderItem.quantity });
      currentCardHeight += menuHeight;
    }

    /* 
      푸터 높이 계산 및 카드 분할
      - 푸터를 추가했을 때 최대 높이를 초과하는지 확인
    */
    const footerHeight = calculateFooter();
    const doseFooterFit = footerHeight + currentCardHeight <= maxHeight;
    if (doseFooterFit) {
      // 푸터가 카드에 맞는 경우
      currentCard.footer.orderId = order.id;
      currentCard.isEnd = true;

      // 카드의 최종 높이가 전체 높이의 절반을 넘는지 확인하고 카드 높이 유형 결정
      const isOverHalf =
        currentCard.heightType === 'full'
          ? currentCardHeight + footerHeight > maxHeight / 2 - 5
          : currentCardHeight + footerHeight > maxHeight - 5;
      currentCard.heightType = isOverHalf ? 'full' : 'half';
      // 현재 카드가 절반 초과 높이이면, 다음 카드는 전체 높이
      // 현재 카드가 절반 이하 높이면, 다음 카드는 절반 높이
      isNextCardTobeHalf = !isOverHalf;

      cardArr.push(currentCard);
    } else {
      // 푸터가 카드 높이에 맞지 않는 경우, 현재 카드를 먼저 추가
      cardArr.push(currentCard);

      // 푸터만을 위한 새로운 카드 생성
      const footerCard = createNewCard(false, order);
      footerCard.header = { ...currentCard.header, startAt: '' }; // 헤더 정보는 유지하되, 시작 시간은 비움
      footerCard.isDone = currentCard.isDone;
      footerCard.isEnd = true;
      footerCard.heightType = 'half'; // 푸터 카드는 항상 절반 높이
      isNextCardTobeHalf = true; // 푸터 카드가 절반을 차지하여, 다음 실제 주문 카드도 절반 높이로 시작

      cardArr.push(footerCard);
    }
  }

  // 최종적으로 생성된 카드 배열 반환
  return cardArr;
}

type HeightType = 'full' | 'half';

export type CardObj = {
  isStart: boolean;
  isEnd: boolean;
  isDone: boolean | null;
  heightType: HeightType;
  header: {
    table: Order['table'];
    startAt: string;
    updatedAt: string;
    orderNumber: number;
  };
  main: { menu: OrderItem['menu']; quantity: number }[];
  footer: {
    orderId: string;
  };
};

/**
 * @description 새로운 주문 카드 객체를 생성
 * @param isStart - 카드가 주문의 시작 부분인지 여부. 기본값은 true
 * @param tableOrder - 카드 생성의 기준이 되는 주문 항목 데이터
 * @returns 생성된 카드 객체.
 */
function createNewCard(isStart: boolean = true, order: Order): CardObj {
  const { is_done, table, order_number, id } = order;

  return {
    isStart,
    isEnd: false,
    isDone: is_done,
    heightType: 'full',
    header: {
      table,
      startAt: '',
      updatedAt: '',
      orderNumber: order_number,
    },
    main: [],
    footer: {
      orderId: id,
    },
  };
}

/**
 * @description 주문 항목 배열을 받아 주문 ID를 기준으로 그룹화된 Map 생성
 * @param orderItems - 전체 주문 항목 목록
 * @returns 주문 ID가 키, 해당 주문에 속한 주문 항목 배열이 값인 Map 객체
 */
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

type FindOrderProps = {
  orders: Order[];
  orderId: string;
};

/**
 * @description 주문 항목에 해당하는 주문의 'updated_at'(완료 또는 수정) 타임스탬프를 찾아서 반환
 * @param props - 주문 정보
 * @returns 타임스탬프 문자열으로 찾지 못하면 빈 문자열 반환
 */
export function findOrderUpdatedAt({ orders, orderId }: FindOrderProps) {
  return orders.find((o) => o.id === orderId)?.updated_at ?? '';
}

/**
 * @description 주문 항목에 해당하는 주문의 'created_at'(접수) 타임스탬프를 찾아서 반환
 * @param props - 주문 정보
 * @returns 타임스탬프 문자열으로 찾지 못하면 빈 문자열 반환
 */
export function findOrderStartAt({ orders, orderId }: FindOrderProps) {
  return orders.find((o) => o.id === orderId)?.created_at ?? '';
}

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
