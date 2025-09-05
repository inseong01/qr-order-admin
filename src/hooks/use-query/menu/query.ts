import { useSetAtom } from 'jotai';
import { addMenu, deleteMenu, UpdateMenu, updateMenu } from '@/lib/supabase/tables/menu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { MENU_LIST_QUERY_KEY } from '../query-key';
import { menuListQueryOptions } from '../query-options';

/**
 * 메뉴 목록을 가져오는 쿼리
 */
export function useQueryMenuList() {
  return useQuery(menuListQueryOptions);
}

/**
 * 메뉴를 추가하는 쿼리
 */
export function useMutationAddMenu() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: addMenu,
    onSuccess(data) {
      const oldData = queryClient.getQueriesData({ queryKey: MENU_LIST_QUERY_KEY }) || [];
      queryClient.setQueryData(MENU_LIST_QUERY_KEY, [...oldData, ...data]);
    },
    onError() {
      showToast('메뉴 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}

/**
 * 메뉴를 수정하는 쿼리
 */
export function useMutationUpdateMenu() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ id, updatedMenu }: { id: string; updatedMenu: UpdateMenu }) => updateMenu(id, updatedMenu),
    onSuccess(data) {
      const oldData = queryClient.getQueryData(menuListQueryOptions.queryKey) ?? [];
      const updatedData = oldData.map((d) => (d.id === data[0].id ? data : d));
      queryClient.setQueryData(MENU_LIST_QUERY_KEY, [...updatedData]);
    },
    onError() {
      showToast('메뉴 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}

/**
 * 메뉴를 삭제하는 쿼리
 */
export function useMutationDeleteMenu() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteMenu(id),
    onSuccess(_, { id }) {
      const oldData = queryClient.getQueryData(menuListQueryOptions.queryKey) || [];
      const updatedData = oldData.filter((d) => d.id !== id);
      queryClient.setQueryData(MENU_LIST_QUERY_KEY, [...updatedData]);
    },
    onError() {
      showToast('메뉴 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}
