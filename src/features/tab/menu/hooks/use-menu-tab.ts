import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

export function useMenuTab() {
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();

  /* menu group by category */
  const menuGroupByCategory: { [key: string]: any } = {};
  const menuCategories = menuCategoriesQuery.data;
  menuListQuery.data?.forEach((m) => {
    const category = m.menu_category.title;
    menuGroupByCategory[category] = menuGroupByCategory[category] ? [...menuGroupByCategory[category], m] : [m];
  });

  /* isMenuExist */
  const hasMenu = Array.isArray(menuListQuery.data) && menuListQuery.data.length !== 0;
  const hasMenuCategory = Array.isArray(menuCategoriesQuery.data) && menuCategoriesQuery.data.length !== 0;
  const isMenuExist = hasMenu && hasMenuCategory;

  /* isLoading */
  const isLoading = menuListQuery.isLoading;

  return { menuGroupByCategory, menuCategories, isMenuExist, isLoading };
}
