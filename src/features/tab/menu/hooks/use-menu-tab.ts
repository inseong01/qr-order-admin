
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { footerAtom } from '@/features/page/footer';
import mockData from '@/mock/menu.test.json';

// TODO: Zustand 스토어 마이그레이션 후 아래 주석 해제
// import { useBoundStore } from '@/store';
// import { useQueryMenuList } from '@/hooks/use-query/query';

export function useMenuTab() {
  // const { data, refetch } = useQueryMenuList();
  const tab = useAtomValue(footerAtom) ?? 'menu';

  // const submitStatus = useBoundStore((state) => state.submit.status);
  // const selectedCategory = useBoundStore((state) => state.category);
  // const setInitSubmitStatus = useBoundStore((state) => state.setInitSubmitStatus);

  // const currentMenuList =
  //   selectedCategory.id === 0 ? data : data?.filter((list) => list.sortId === selectedCategory.id);

  const menuCategories: { [key: string]: any } = {};
  mockData?.forEach((v) => {
    const category = v.category_id;
    // TODO: 카테고리 ID를 실제 카테고리 이름과 매칭하는 로직 추가 필요
    if (category) {
      menuCategories[category] = menuCategories[category] ? [...menuCategories[category], v] : [v];
    }
  });
  const menuCategoryKeys = Object.keys(menuCategories);

  // 기능: 메뉴 데이터 리패치
  useEffect(() => {
    if (tab !== 'menu') return;
    // if (submitStatus === 'fulfilled') {
    //   refetch();
    //   setInitSubmitStatus();
    // }
  }, [tab]); //, submitStatus]);

  return { menuCategories, menuCategoryKeys };
}
