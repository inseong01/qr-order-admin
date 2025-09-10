import { Order } from '@/lib/supabase/tables/order';
import { OrderItem } from '@/lib/supabase/tables/order-item';

import { CardObj } from './types';
import { buildOrdersMap } from './build-orders-map';
import { createNewCard } from './create-new-card';
import { findOrderStartAt, findOrderUpdatedAt } from './find-order';
import { calculateFooter, calculateHeader, calculateMain } from './calculate-height';

type GenerateCardLayoutArrProps = {
  orders: Order[];
  orderItems: OrderItem[];
  maxHeight: number;
};

/**
 * 주문 데이터를 기반으로 영수증 카드 레이아웃을 동적으로 생성
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
      currentCard.main.push(orderItem);
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
