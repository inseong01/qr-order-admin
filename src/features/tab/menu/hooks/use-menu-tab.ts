import { useQueryMenuList } from '@/hooks/use-query/menu/query';
import { useQueryMenuCategoryList } from '@/hooks/use-query/menu-category/query';

import { MenuCategories, MenuGroupByCategory } from '../types';

/**
 * 메뉴/분류 목록 쿼리 반환 훅
 */
export function useMenuTab() {
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();

  /* menu group by category */
  const menuGroupByCategory: MenuGroupByCategory = {};
  const menuCategories: MenuCategories = menuCategoriesQuery.data ?? [];
  menuListQuery.data?.forEach((m) => {
    const category = m.menu_category.title;
    menuGroupByCategory[category] = menuGroupByCategory[category] ? [...menuGroupByCategory[category], m] : [m];
  });

  /* isExist */
  const hasMenu = Array.isArray(menuListQuery.data) && menuListQuery.data.length !== 0;
  const hasMenuCategory = Array.isArray(menuCategoriesQuery.data) && menuCategoriesQuery.data.length !== 0;
  const isExist = hasMenu || hasMenuCategory;

  /* isLoading */
  const isLoading = menuListQuery.isLoading;

  /* isError */
  const isError = menuListQuery.isError || menuCategoriesQuery.isError;

  return { menuGroupByCategory, menuCategories, isExist, isLoading, isError };
}
