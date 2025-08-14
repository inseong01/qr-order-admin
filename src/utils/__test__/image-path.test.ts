/**
 * @file image-path 유틸리티 함수 단위 테스트입니다.
 * @description createImgPath 함수가 fileId 존재 여부에 따라
 *              올바른 이미지 경로를 생성하는지 검증합니다.
 */

import { describe, expect, it } from 'vitest';
import { BUCKET, STORE } from '@/lib/supabase/storage/store';
import { createImgPath } from '../function/image-path';

describe('image-path 유틸리티 함수', () => {
  describe('createImgPath', () => {
    it('fileId가 존재할 때, 해당 fileId 기반 경로 반환', () => {
      const fileId = 'file-id';
      const result = createImgPath({ fileId });

      expect(result).toBe(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${BUCKET}/${STORE}/menu_${fileId}`
      );
    });

    it('fileId가 없을 때, 기본 이미지 경로 반환', () => {
      const fileId = '';
      const result = createImgPath({ fileId });

      expect(result).toBe(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${BUCKET}/${STORE}/menu_default`
      );
    });
  });
});
