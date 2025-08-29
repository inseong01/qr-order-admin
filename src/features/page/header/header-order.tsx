import { useAtomValue, useSetAtom } from 'jotai';

import { useQueryAllOrderList } from '@/hooks/use-query/query';
import Tab from '@/components/ui/tab';
import { headerTabIdxAtom } from '.';

export default function HeaderOrderTab() {
  const headerTabIdx = useAtomValue(headerTabIdxAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);
  const allOrdersQuery = useQueryAllOrderList();
  const processingOrders = allOrdersQuery.data?.filter((o) => !o.is_done) ?? [];
  const completeOrders = allOrdersQuery.data?.filter((o) => o.is_done) ?? [];

  const handleTabClick = async (tabIdx: number) => {
    if (headerTabIdx === tabIdx) return;
    setHeaderTabIdx(tabIdx);
  };

  return (
    <>
      <Tab
        key={'header-processing'}
        text={`접수 ${processingOrders.length}`}
        isSelected={headerTabIdx === 0}
        handleTabClick={() => handleTabClick(0)}
      />

      <Tab
        key={'header-done'}
        text={`완료 ${completeOrders.length}`}
        isSelected={headerTabIdx === 1}
        handleTabClick={() => handleTabClick(1)}
      />
    </>
  );
}
