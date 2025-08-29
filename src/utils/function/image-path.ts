import { BUCKET, STORE } from '@/lib/supabase/storage/store';

type CreateImgPathProps = {
  fileId: string;
};

/**
 * 이미지 경로를 생성하거나 기존 경로를 반환
 */
export function createImgPath({ fileId }: CreateImgPathProps) {
  if (fileId) {
    return `https://${import.meta.env.VITE_SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${BUCKET}/${STORE}/menu_${fileId}`;
  }

  return `https://${import.meta.env.VITE_SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${BUCKET}/${STORE}/menu_default`;
}
