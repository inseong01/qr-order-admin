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
