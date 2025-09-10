import { Menu } from '@/lib/supabase/tables/menu';
import { ChangeEvent } from 'react';

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
