import { MenuCategory } from '@/lib/supabase/tables/menu-category';

export type MenuGroupByCategory = { [key: string]: any };

export type DataWrapperProps = {
  data: DataComponentProps['data'];
  error: boolean;
};

export type DataComponentProps = {
  data: {
    menuGroupByCategory: MenuGroupByCategory;
    menuCategories: MenuCategory[];
    isExist: boolean;
  };
};
