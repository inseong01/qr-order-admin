import { ChangeEvent } from 'react';

import { Menu } from '@/lib/supabase/tables/menu';
import { MenuCategory } from '@/lib/supabase/tables/menu-category';

export type MenuFormFieldsProps = {
  inputValue: Menu;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  categories: { id: string; title: string }[] | undefined;
};

export type MenuImageInputProps = {
  mode: 'create' | 'update';
  imageUrl?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type BuildMenuDataProps = {
  inputValue: Menu;
  menuCategories?: MenuCategory[];
  menuImageFile?: File;
};

export type UpdateMenuDataProps = {
  inputValue: Menu;
  menuCategories?: MenuCategory[];
  menuImageFile?: File;
};
