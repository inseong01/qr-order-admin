/**
 * @file 메뉴 데이터 처리 유틸리티 함수의 단위 테스트입니다.
 * @description 신규 메뉴 생성(buildMenuData) 및 기존 메뉴 수정(updateMenuData) 시
 *              데이터가 올바른 형식으로 가공되는지 검증합니다.
 */
import { describe, it, expect, vi } from 'vitest';
import { buildMenuData, updateMenuData } from '../set-menu';

// createImgPath 모킹
vi.mock('@/util/function/image-path', () => ({
  createImgPath: vi.fn(({ fileId }: { fileId: string }) => `mock-url/${fileId}`),
}));

describe('buildMenuData', () => {
  it('메뉴 데이터를 buildMenuData 형식 변환', () => {
    const inputValue = {
      id: '1',
      name: '메뉴1',
      price: '12000',
      tag: '추천',
      menu_category: { title: '카테고리1' },
    } as any;

    const menuCategories = [
      { id: 'cat1', title: '카테고리1' },
      { id: 'cat2', title: '카테고리2' },
    ];

    const fileId = 'file123';

    const result = buildMenuData({ inputValue, menuCategories, fileId });

    expect(result.img_url).toBe(`mock-url/${fileId}`);
    expect(result.category_id).toBe('cat1');
    expect(result.name).toBe('메뉴1');
    expect(result.price).toBe(12000);
    expect(result.tag).toBe('추천');
  });
});

describe('updateMenuData', () => {
  it('hasImg가 true면 새 이미지 URL로 업데이트', () => {
    const inputValue = {
      id: '1',
      name: '메뉴1',
      price: '12000',
      tag: '추천',
      menu_category: { title: '카테고리1' },
      img_url: 'old-url',
    } as any;

    const menuCategories = [{ id: 'cat1', title: '카테고리1' }];
    const fileId = 'file123';
    const hasImg = true;

    const result = updateMenuData({ inputValue, menuCategories, hasImg });

    expect(result.img_url).toBe(`mock-url/${fileId}`);
    expect(result.id).toBe('1');
    expect(result.category_id).toBe('cat1');
    expect(result.name).toBe('메뉴1');
    expect(result.price).toBe(12000);
    expect(result.tag).toBe('추천');
  });

  it('hasImg가 false면 기존 이미지 URL 유지', () => {
    const inputValue = {
      id: '1',
      name: '메뉴1',
      price: '12000',
      tag: '추천',
      menu_category: { title: '카테고리1' },
      img_url: 'old-url',
    } as any;

    const menuCategories = [{ id: 'cat1', title: '카테고리1' }];
    const hasImg = false;

    const result = updateMenuData({ inputValue, menuCategories, hasImg });

    // 이미지 URL이 기존 값 유지
    expect(result.img_url).toBe('old-url');
    expect(result.id).toBe('1');
    expect(result.category_id).toBe('cat1');
    expect(result.name).toBe('메뉴1');
    expect(result.price).toBe(12000);
    expect(result.tag).toBe('추천');
  });
});
