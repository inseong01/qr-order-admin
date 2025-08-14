import { Menu } from '@/lib/supabase/tables/menu';
import { MenuCategory } from '@/lib/supabase/tables/menu-category';
import { createImgPath } from '@/utils/function/image-path';

type BuildMenuDataProps = {
  inputValue: Menu;
  menuCategories?: MenuCategory[];
  fileId: string;
};

export function buildMenuData({ inputValue, menuCategories, fileId }: BuildMenuDataProps) {
  const img_url = createImgPath({ fileId });

  return {
    img_url,
    category_id: menuCategories?.find((c) => c.title === inputValue.menu_category.title)?.id,
    name: inputValue.name,
    price: Number(inputValue.price),
    tag: inputValue.tag,
  };
}

type UpdateMenuDataProps = {
  inputValue: Menu;
  menuCategories?: MenuCategory[];
  fileId: string;
  hasImg: boolean;
};

export function updateMenuData({ inputValue, menuCategories, fileId, hasImg }: UpdateMenuDataProps) {
  const img_url = hasImg ? createImgPath({ fileId }) : inputValue.img_url;

  return {
    img_url,
    id: inputValue.id,
    category_id: menuCategories?.find((c) => c.title === inputValue.menu_category.title)?.id,
    name: inputValue.name,
    price: Number(inputValue.price),
    tag: inputValue.tag,
  };
}
