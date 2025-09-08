import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { menuCategoryQueryOptions, menuListQueryOptions } from '../query-options';
import {
  addMenuCategory,
  deleteMenuCategory,
  NewMenuCategory,
  UpdateMenuCategory,
  updateMenuCategory,
} from '@/lib/supabase/tables/menu-category';
import { deleteImageByFileName } from '@/lib/supabase/storage/store';

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
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: menuCategoryQueryOptions.queryKey });
      showToast('추가되었습니다.');
    },
    onError(error) {
      console.error(error.message);
      showToast('오류가 발생했습니다.');
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
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: menuCategoryQueryOptions.queryKey });
      await queryClient.invalidateQueries({ queryKey: menuListQueryOptions.queryKey });
      showToast('수정되었습니다.');
    },
    onError(error) {
      console.error(error.message);
      showToast('오류가 발생했습니다.');
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
    mutationFn: ({ ids }: { ids: string[]; filePath: string[] }) => deleteMenuCategory(ids),
    async onSuccess(_, { filePath }) {
      // TODO: Storage Cascade 삭제 Edge Function 적용 또는 직접 카테고리 별 삭제 구현
      if (filePath.length > 0) {
        await deleteImageByFileName({ filePath });
      }
      await queryClient.invalidateQueries({ queryKey: menuCategoryQueryOptions.queryKey });
      await queryClient.invalidateQueries({ queryKey: menuListQueryOptions.queryKey });
      showToast('삭제되었습니다.');
    },
    onError(error) {
      console.error(error.message);
      showToast('오류가 발생했습니다.');
    },
  });

  return mutation;
}
