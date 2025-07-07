/**
 * 주문 목록 데이터 구조. 각 요소는 주문 그룹(배열)이며,
 * 여러 주문 그룹이 하나의 배열로 묶여 있습니다.
 * 예: [[{ id: 1, ... }], [{ id: 2, ... }]]
 */
type OrderList = {
  id: number;
  name: string;
  price: number;
  amount: number;
}[][];

/**
 * 영수증에 표시될 최종 메뉴 항목의 데이터 구조.
 * 중복된 메뉴는 수량이 합산됩니다.
 */
export type ReceiptItem = {
  name: string;
  price: number;
  amount: number;
};

/**
 * 메뉴 이름을 키로 사용하여 중간 집계를 수행하는 객체의 데이터 구조.
 */
type MenuCollection = {
  [key: string]: ReceiptItem;
};

/**
 * 중첩된 주문 목록을 받아 중복된 메뉴를 합산하여 최종 영수증 목록을 생성합니다.
 *
 * @param {OrderList | undefined} orderList - 처리할 주문 목록. undefined이거나 빈 배열일 수 있습니다.
 * @returns {ReceiptItem[]} - 수량이 합산된 최종 메뉴 항목 배열. 입력이 없으면 빈 배열을 반환합니다.
 */
function createReceipt(orderList: OrderList | undefined): ReceiptItem[] {
  // 주문 목록이 유효하지 않으면 빈 배열을 반환합니다.
  if (!orderList?.length) {
    return [];
  }

  const receiptItems: ReceiptItem[] = [];
  const menuCollection: MenuCollection = {};

  // 중첩된 주문 배열을 1차원 배열로 평탄화합니다.
  const flatOrderList = orderList.flat();

  // 평탄화된 주문 목록을 순회하며 메뉴별로 수량을 합산합니다.
  for (const orderItem of flatOrderList) {
    const { name, price, amount } = orderItem;

    if (menuCollection[name]) {
      // 이미 집계된 메뉴는 수량을 더합니다.
      menuCollection[name].amount += amount;
    } else {
      // 처음 집계되는 메뉴는 새로 추가합니다.
      menuCollection[name] = { name, price, amount };
    }
  }

  // 집계된 메뉴 객체를 배열로 변환합니다.
  for (const key in menuCollection) {
    receiptItems.push(menuCollection[key]);
  }

  // 최종 영수증 목록을 반환합니다.
  return receiptItems;
}

export default createReceipt;