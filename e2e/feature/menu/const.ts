import mockInitMenus from './mock/menu.init.json' assert { type: 'json' };
import mockInitMenuCategory from './mock/menu_category.init.json' assert { type: 'json' };

export const newCategory = { id: 'cat-002', title: '음료' } as const;
export const updatedCategory = { id: 'cat-002', title: '제로 음료' } as const;

export const newMenu = {
  id: 'menu-003',
  img_url: 'cider.jpg',
  name: '사이다',
  price: 4000,
  tag: '신규',
  menu_category: newCategory,
} as const;
export const updatedMenu = {
  id: 'menu-003',
  img_url: 'cider.jpg',
  name: '제로 사이다',
  price: 2000,
  tag: '신규',
  menu_category: newCategory,
} as const;

export const mockMenu = mockInitMenus[0];
export const mockMenuCategory = mockInitMenuCategory[0];

export async function generateFakeImage() {
  const blob = new Blob([], { type: 'image/png' });
  const file = new File([blob], 'test.png', { type: 'image/png' });
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return {
    name: file.name,
    mimeType: file.type,
    buffer,
  };
}

export const TEST_PAGE_URL = '/';
