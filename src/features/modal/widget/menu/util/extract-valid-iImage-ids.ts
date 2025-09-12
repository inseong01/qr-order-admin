import { STORE } from '@/lib/supabase/storage/const';
import { Menu } from '@/lib/supabase/tables/menu';

/**
 * 선택된 카테고리에 속하고 기본 이미지가 아닌 메뉴들의 이미지 경로를 추출합니다.
 *
 * @param querydata     전체 메뉴 데이터 배열
 * @param selectedData  선택된 카테고리 ID 배열
 * @returns             조건에 맞는 메뉴들의 이미지 URL 배열 (없으면 빈 배열)
 */
export function extractValidImageIds(querydata: Menu[], selectedData: string[]) {
  return (
    querydata
      ?.filter((m) => selectedData.includes(m.menu_category.id) && !m.img_url.includes('menu_default'))
      .map((m) => `${STORE}/${m.img_url}`) ?? []
  );
}
