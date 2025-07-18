import { useAtomValue } from 'jotai';
import { headerTabIdxAtom } from '@/features/page/header';
import { useQueryAllOrderList } from '@/hooks/use-query/query';

// TODO: Zustand 스토어 마이그레이션 후 아래 주석 해제
// import { useBoundStore } from '@/store';
// import { useQueryAllOrderList } from '@/hooks/use-query/query';

export function useOrderTab() {
  const { data } = useQueryAllOrderList();
  const categoryKey = useAtomValue(headerTabIdxAtom); // 예시: selectedCategory.id
  const isDone = categoryKey === 1;

  // 기능: 주문 데이터 리패치
  // useEffect(() => {
  //   if (tab !== 'order') return;
  //   if (submitStatus === 'fulfilled') {
  //     refetch();
  //   }
  // }, [submitStatus, tab]);

  const orders = isDone ? (data?.filter((o) => o.is_done) ?? []) : (data?.filter((o) => !o.is_done) ?? []);

  return { orders, isDone };
}
