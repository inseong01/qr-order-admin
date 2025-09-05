import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { allOrderListQueryOptions, orderItemsQueryOptions } from '../query-options';
import { completeOrder, deleteOrder } from '@/lib/supabase/tables/order';
import { showToastAtom } from '@/features/alert/toast/store/atom';

/**
 * 전체 주문 목록을 가져오는 쿼리
 */
export function useQueryAllOrderList() {
  return useQuery(allOrderListQueryOptions);
}

/**
 * 전체 주문 메뉴 목록을 가져오는 쿼리
 */
export function useQueryOrderItems() {
  return useQuery(orderItemsQueryOptions);
}

/**
 * 주문을 완료 처리하는 쿼리
 */
export function useMutationCompleteOrder() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => completeOrder(id),
    onSuccess(_, { id }) {
      const oldData = queryClient.getQueryData(allOrderListQueryOptions.queryKey) || [];
      const updatedData = oldData.map((order) => (order.id === id ? { ...order, is_done: true } : order));
      queryClient.setQueryData(allOrderListQueryOptions.queryKey, updatedData);
    },
    onError() {
      showToast('주문 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}

/**
 * 주문을 삭제하는 쿼리
 */
export function useMutationDeleteOrder() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteOrder(id),
    onSuccess(_, { id }) {
      const oldData = queryClient.getQueryData(allOrderListQueryOptions.queryKey) || [];
      const updatedData = oldData.filter((d) => d.id !== id);
      queryClient.setQueryData(allOrderListQueryOptions.queryKey, updatedData);
    },
    onError() {
      showToast('주문 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}
