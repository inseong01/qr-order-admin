import { createNewCard } from './create-new-card';
import { buildOrdersMap } from './build-orders-map';
import { CardObj, GenerateCardLayoutArrProps } from './types';
import { findOrderStartAt, findOrderUpdatedAt } from './find-order';
import { calculateFooter, calculateHeader, calculateMain } from './calculate-height';

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
  const cardArr: CardObj[] = [];

  // 다음 카드가 절반 높이인지 여부
  let isNextCardTobeHalf = false;

  for (const order of orders) {
    const tableOrder = ordersMap.get(order.id) ?? [];
    let currentCardHeight = 0;

    // 첫 카드 생성
    let currentCard = createNewCard(true, order);

    // 주문 시작/업데이트 시간 조회
    const startAt = currentCard.isStart ? findOrderStartAt({ orders, orderId: order.id }) : '';
    const updatedAt = currentCard.isStart ? findOrderUpdatedAt({ orders, orderId: order.id }) : '';
    const orderNumber = order.order_number;

    currentCard.isDone = order.is_done;
    currentCard.header = { table: order.table, startAt, updatedAt, orderNumber };

    // 이전 카드가 절반 높이였으면 현재 카드 초기 높이를 절반으로 설정
    if (isNextCardTobeHalf) {
      currentCardHeight = Math.floor(maxHeight / 2) - 5;
      currentCard.heightType = 'half';
      isNextCardTobeHalf = false;
    }

    // 헤더 높이 계산 및 카드 분할 여부 판단
    const headerHeight = calculateHeader(currentCard.isStart);
    if (headerHeight + currentCardHeight > maxHeight) {
      cardArr.push(currentCard); // 카드 초과 시 배열에 추가
      currentCard = createNewCard(false, order); // 새 카드 생성
      currentCard.isDone = order.is_done;
      currentCard.header = { table: order.table, startAt: '', updatedAt: '', orderNumber };
      currentCardHeight = calculateHeader(false);
    } else {
      currentCardHeight += headerHeight;
    }

    // 주문 항목 처리
    const menuHeight = calculateMain();
    for (const orderItem of tableOrder) {
      // 카드 최대 높이 초과 시 새 카드 생성
      if (menuHeight + currentCardHeight > maxHeight) {
        cardArr.push(currentCard);
        currentCard = createNewCard(false, order);
        currentCard.isDone = order.is_done;
        currentCard.header = { table: order.table, startAt: '', updatedAt: '', orderNumber };
        currentCardHeight = calculateHeader(false);
      }

      currentCard.main.push(orderItem); // 주문 항목 추가
      currentCardHeight += menuHeight;
    }

    // 푸터 처리
    const footerHeight = calculateFooter();
    const doseFooterFit = footerHeight + currentCardHeight <= maxHeight;

    if (doseFooterFit) {
      // 푸터가 카드에 들어갈 수 있는 경우
      currentCard.footer.orderId = order.id;
      currentCard.isEnd = true;

      // 카드 높이 유형 결정
      const isOverHalf =
        currentCard.heightType === 'full'
          ? currentCardHeight + footerHeight > maxHeight / 2 - 5
          : currentCardHeight + footerHeight > maxHeight - 5;

      currentCard.heightType = isOverHalf ? 'full' : 'half';
      isNextCardTobeHalf = !isOverHalf;

      cardArr.push(currentCard);
    } else {
      // 푸터가 카드에 맞지 않으면 현재 카드 먼저 추가
      cardArr.push(currentCard);

      // 푸터 전용 카드 생성
      const footerCard = createNewCard(false, order);
      footerCard.header = { ...currentCard.header, startAt: '' }; // 시작 시간 제거
      footerCard.isDone = currentCard.isDone;
      footerCard.isEnd = true;
      footerCard.heightType = 'half';
      isNextCardTobeHalf = true;

      cardArr.push(footerCard);
    }
  }

  return cardArr; // 생성된 카드 배열 반환
}
