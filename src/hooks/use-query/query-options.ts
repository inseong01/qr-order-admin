import { queryOptions } from '@tanstack/react-query';

import { getTableList } from '@/lib/supabase/tables/table';
import { getRequestList } from '@/lib/supabase/tables/request';
import { getMenuList } from '@/lib/supabase/tables/menu';
import { getOrderList } from '@/lib/supabase/tables/order';
import { getRequestItemList } from '@/lib/supabase/tables/request-item';
import { getOrderItems } from '@/lib/supabase/tables/order-item';
import { getMenuCategory } from '@/lib/supabase/tables/menu-category';
import {
  ALL_ORDER_LIST_QUERY_KEY,
  FIRST_REQUEST_QUERY_KEY,
  MENU_CATEGORIES_QUERY_KEY,
  MENU_LIST_QUERY_KEY,
  ORDER_LIST_QUERY_KEY,
  REQUEST_LIST_QUERY_KEY,
  TABLE_LIST_QUERY_KEY,
} from './query-key';

/**
 * 공통 쿼리 옵션 생성 함수
 *
 * - React Query options을 공통 설정 및 타입 추론을 위해 사용합니다.
 * - 테스트 환경에서는 재시도를 하지 않도록 처리합니다.
 * - 실패 횟수가 2회를 초과하면 재시도를 중단합니다.
 */
function createQueryOptions<T>(key: readonly unknown[], fn: () => Promise<T>) {
  return queryOptions({
    queryKey: key,
    queryFn: fn,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });
}

/** 테이블 목록 쿼리 옵션 */
export const tableListQueryOptions = createQueryOptions(TABLE_LIST_QUERY_KEY, getTableList);

/** 요청 목록 쿼리 옵션 */
export const requestListQueryOptions = createQueryOptions(REQUEST_LIST_QUERY_KEY, getRequestList);

/** 첫번째 요청 목록 쿼리 옵션 */
export const firstRequestQueryOptions = (request_id: string) =>
  createQueryOptions([...FIRST_REQUEST_QUERY_KEY, request_id], () => getRequestItemList(request_id));

/** 메뉴 목록 쿼리 옵션 */
export const menuListQueryOptions = createQueryOptions(MENU_LIST_QUERY_KEY, getMenuList);

/** 전체 주문 목록 쿼리 옵션 */
export const allOrderListQueryOptions = createQueryOptions(ALL_ORDER_LIST_QUERY_KEY, getOrderList);

/** 전체 주문 메뉴 목록 쿼리 옵션 */
export const orderItemsQueryOptions = createQueryOptions(ORDER_LIST_QUERY_KEY, getOrderItems);

/** 메뉴 카테고리 목록 쿼리 옵션 */
export const menuCategoryQueryOptions = createQueryOptions(MENU_CATEGORIES_QUERY_KEY, getMenuCategory);
