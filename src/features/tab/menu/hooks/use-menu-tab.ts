import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

export function useMenuTab() {
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();

  const menuGroupByCategory: { [key: string]: any } = {};
  const menuCategories = menuCategoriesQuery.data;
  const isMenuExist = Object.keys(menuGroupByCategory).length === 0;

  /* 메뉴 분류 */
  menuListQuery.data?.forEach((m) => {
    const category = m.menu_category.title;
    menuGroupByCategory[category] = menuGroupByCategory[category] ? [...menuGroupByCategory[category], m] : [m];
  });

  const isLoading = menuListQuery.isLoading;

  return { menuGroupByCategory, menuCategories, isMenuExist, isLoading };
}
