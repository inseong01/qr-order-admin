/**
 * @file 메뉴 데이터 처리 유틸리티 함수의 단위 테스트입니다.
 * @description 신규 메뉴 생성(buildMenuData) 및 기존 메뉴 수정(updateMenuData) 시
 *              데이터가 올바른 형식으로 가공되는지 검증합니다.
 */
import { describe, it, expect } from 'vitest';
import { buildMenuData, updateMenuData } from '../set-menu';

describe('buildMenuData', () => {
  it('첨부한 이미지가 없는 경우 기본 이미지 파일명으로 메뉴 데이터 변환', () => {
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
    const result = buildMenuData({ inputValue, menuCategories });

    expect(result.img_url).toMatch('menu_default.jpg');
    expect(result.category_id).toBe('cat1');
    expect(result.name).toBe('메뉴1');
    expect(result.price).toBe(12000);
    expect(result.tag).toBe('추천');
  });

  it('첨부한 이미지가 있는 경우 난수 파일명으로 메뉴 데이터 형식 변환', () => {
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
    const filename = 'file123.png';
    const blob = new Blob([], { type: 'image/png' });
    const mockMenuImageFile = new File([blob], filename, { type: 'image/png' });
    const result = buildMenuData({ inputValue, menuCategories, menuImageFile: mockMenuImageFile });

    expect(result.img_url).toMatch(/^\d{10}\.(jpg|png|webp)$/);
    expect(result.category_id).toBe('cat1');
    expect(result.name).toBe('메뉴1');
    expect(result.price).toBe(12000);
    expect(result.tag).toBe('추천');
  });
});

describe('updateMenuData', () => {
  const filename = 'file123.png';

  it('첨부한 이미지가 있는 경우 난수 파일명으로 메뉴 데이터 반환', () => {
    const inputValue = {
      id: '1',
      name: '메뉴1',
      price: '12000',
      tag: '추천',
      menu_category: { title: '카테고리1' },
      img_url: filename,
    } as any;

    const menuCategories = [{ id: 'cat1', title: '카테고리1' }];
    const blob = new Blob([], { type: 'image/png' });
    const mockMenuImageFile = new File([blob], 'test.png', { type: 'image/png' });
    const result = updateMenuData({ inputValue, menuCategories, menuImageFile: mockMenuImageFile });

    expect(result.img_url).toMatch(/^\d{10}\.(jpg|png|webp)$/);
    expect(result.id).toBe('1');
    expect(result.category_id).toBe('cat1');
    expect(result.name).toBe('메뉴1');
    expect(result.price).toBe(12000);
    expect(result.tag).toBe('추천');
  });

  it('첨부한 이미지가 없는 경우 기존 이미지 파일명 유지', () => {
    const inputValue = {
      id: '1',
      name: '메뉴1',
      price: '12000',
      tag: '추천',
      menu_category: { title: '카테고리1' },
      img_url: filename,
    } as any;
    const menuCategories = [{ id: 'cat1', title: '카테고리1' }];
    const result = updateMenuData({ inputValue, menuCategories });

    expect(result.img_url).toBe(filename);
    expect(result.id).toBe('1');
    expect(result.category_id).toBe('cat1');
    expect(result.name).toBe('메뉴1');
    expect(result.price).toBe(12000);
    expect(result.tag).toBe('추천');
  });
});
