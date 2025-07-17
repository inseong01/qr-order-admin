import { useQuery } from '@tanstack/react-query';

import { MENU_LIST_QUERY_KEY } from '@/hooks/use-query/query-client';
import { Menu } from '@/lib/supabase/function/menu';

export function useMenuTab() {
  const { data } = useQuery<Menu[]>({ queryKey: MENU_LIST_QUERY_KEY });

  const menuGroupByCategory: { [key: string]: any } = {};
  data?.forEach((v) => {
    const category = v.menu_category.title;
    menuGroupByCategory[category] = menuGroupByCategory[category] ? [...menuGroupByCategory[category], v] : [v];
  });
  const menuCategoryKeys = Object.keys(menuGroupByCategory);

  return { menuGroupByCategory, menuCategoryKeys };
}
