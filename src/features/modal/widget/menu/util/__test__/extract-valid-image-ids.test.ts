import { describe, it, expect } from 'vitest';
import { Menu } from '@/lib/supabase/tables/menu';

import { extractValidImageIds } from '../extract-valid-iImage-ids';

describe('extractValidImageIds', () => {
  it('선택된 카테고리의 메뉴인 경우 이미지 경로를 반환한다', () => {
    const querydata: Menu[] = [
      {
        id: 'menu-001',
        menu_category: { id: 'cat-001', title: '버거' },
        img_url: `burger.png`,
        name: '햄버거',
        price: 5000,
        tag: '인기',
      },
      {
        id: 'menu-002',
        menu_category: { id: 'cat-002', title: '피자' },
        img_url: `pizza.png`,
        name: '불고기 피자',
        price: 12000,
        tag: '신규',
      },
    ];

    const result = extractValidImageIds(querydata, ['cat-001', 'cat-002']);
    expect(result).toEqual(['store_2/burger.png', 'store_2/pizza.png']);
  });

  it('선택된 카테고리의 메뉴에서 기본 이미지(menu_default)는 결과에서 제외된다', () => {
    const querydata: Menu[] = [
      {
        id: 'menu-003',
        menu_category: { id: 'cat-001', title: '버거' },
        img_url: `menu_default`,
        name: '기본이미지',
        price: 0,
        tag: '',
      },
    ];

    const result = extractValidImageIds(querydata, ['cat-001']);
    expect(result).toEqual([]);
  });

  it('선택되지 않은 카테고리의 메뉴는 결과에서 제외한다', () => {
    const querydata: Menu[] = [
      {
        id: 'menu-004',
        menu_category: { id: 'cat-001', title: '버거' },
        img_url: `hotdog.png`,
        name: '핫도그',
        price: 3000,
        tag: '',
      },
    ];

    const result = extractValidImageIds(querydata, ['cat-999']);
    expect(result).toEqual([]);
  });

  it('querydata가 undefined일 경우 빈 배열을 반환한다', () => {
    const result = extractValidImageIds(undefined as unknown as Menu[], ['cat-001']);
    expect(result).toEqual([]);
  });
});
