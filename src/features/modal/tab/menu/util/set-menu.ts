import { generateNumberId } from './generate-id';
import { BuildMenuDataProps, UpdateMenuDataProps } from '../types';

export function buildMenuData({ inputValue, menuCategories, menuImageFile }: BuildMenuDataProps) {
  const newId = generateNumberId();
  const extension = menuImageFile?.name.split('.').pop()?.toLowerCase();
  const filename = menuImageFile ? `${newId}.${extension}` : 'menu_default.jpg';

  return {
    name: inputValue.name,
    img_url: filename,
    category_id: menuCategories?.find((c) => c.title === inputValue.menu_category.title)?.id.toString(),
    price: Number(inputValue.price),
    tag: inputValue.tag,
  };
}

export function updateMenuData({ inputValue, menuCategories, menuImageFile }: UpdateMenuDataProps) {
  if (!menuImageFile) {
    return {
      id: inputValue.id,
      name: inputValue.name,
      img_url: inputValue.img_url,
      category_id: menuCategories?.find((c) => c.title === inputValue.menu_category.title)?.id.toString(),
      price: Number(inputValue.price),
      tag: inputValue.tag,
    };
  }

  const newId = generateNumberId();
  const extension = menuImageFile.name.split('.').pop()?.toLowerCase();
  const newFilename = `${newId}.${extension}`;

  return {
    id: inputValue.id,
    name: inputValue.name,
    img_url: newFilename,
    category_id: menuCategories?.find((c) => c.title === inputValue.menu_category.title)?.id.toString(),
    price: Number(inputValue.price),
    tag: inputValue.tag,
  };
}
