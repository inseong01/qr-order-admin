import { BUCKET, STORE } from '@/lib/supabase/storage/const';

/**
 * Storage 총량 500MB
 *
 * - 섬네일 사진 200KB 제한
 */
export const MAX_FILE_SIZE = 200 * 1024;

/**
 * Storage 파일 불러오는 주소
 *
 * - BUCKET 이후 주소는 파일명(store_2/menu_default.jpg)을 포함하고 있어야 함
 */
export const SUPABASE_STORAGE_BASE_URL =
  `https://${import.meta.env.VITE_SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${BUCKET}/${STORE}` as const;
