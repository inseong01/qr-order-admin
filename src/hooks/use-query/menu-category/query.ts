import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { menuCategoryQueryOptions } from '../query-options';
import {
  addMenuCategory,
  deleteMenuCategory,
  NewMenuCategory,
  UpdateMenuCategory,
  updateMenuCategory,
} from '@/lib/supabase/tables/menu-category';
import { showToastAtom } from '@/features/alert/toast/store/atom';

/**
 * 메뉴 카테고리 목록을 가져오는 쿼리
 */
export function useQueryMenuCategoryList() {
  return useQuery(menuCategoryQueryOptions);
}

/**
 * 메뉴 카테고리를 추가하는 쿼리
 */
export function useMutationAddMenuCategory() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: (newMenuCategory: NewMenuCategory) => addMenuCategory(newMenuCategory),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: menuCategoryQueryOptions.queryKey });
    },
    onError() {
      showToast('메뉴 카테고리 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}

/**
 * 메뉴 카테고리를 수정하는 쿼리
 */
export function useMutationUpdateMenuCategory() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: (updatedMenuCategories: UpdateMenuCategory[]) => updateMenuCategory(updatedMenuCategories),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: menuCategoryQueryOptions.queryKey });
    },
    onError() {
      showToast('메뉴 카테고리 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}

/**
 * 메뉴 카테고리를 삭제하는 쿼리
 */
export function useMutationDeleteMenuCategory() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => deleteMenuCategory(ids),
    onSuccess(_, { ids }) {
      const oldData = queryClient.getQueryData(menuCategoryQueryOptions.queryKey) || [];
      const updatedData = oldData.filter((d) => !ids.includes(d.id));
      queryClient.setQueryData(menuCategoryQueryOptions.queryKey, updatedData);
    },
    onError() {
      showToast('메뉴 카테고리 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}
