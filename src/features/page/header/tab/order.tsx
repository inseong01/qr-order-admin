import { useAtomValue } from 'jotai';

import Tab from '@/components/ui/tab';
import { useQueryAllOrderList } from '@/hooks/use-query/query';

import { headerTabAtom } from '../store/atom';
import { useHeaderHandler } from '../hook/use-header-hadler';

export default function HeaderOrderTab() {
  const headerTabIdx = useAtomValue(headerTabAtom);
  const allOrdersQuery = useQueryAllOrderList();
  const processingOrders = allOrdersQuery.data?.filter((o) => !o.is_done) ?? [];
  const completeOrders = allOrdersQuery.data?.filter((o) => o.is_done) ?? [];

  const { tabClick } = useHeaderHandler();

  return (
    <>
      <Tab
        key={'header-processing'}
        text={`접수 ${processingOrders.length}`}
        isSelected={headerTabIdx === 0}
        handleTabClick={() => tabClick(0)}
      />

      <Tab
        key={'header-done'}
        text={`완료 ${completeOrders.length}`}
        isSelected={headerTabIdx === 1}
        handleTabClick={() => tabClick(1)}
      />
    </>
  );
}
