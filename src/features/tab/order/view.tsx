import { useMemo } from 'react';
import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/window-atom';
import { generateCardLayoutArr } from '@/features/tab/order/util/generate-card';
import { ExceptionText } from '@/components/ui/exception';
import LoadingSpinner from '@/features/load/spinner';

import { ListUlBox } from '../components/list-box';
import { useOrderTab } from './hooks/use-order-tab';
import Card from './components/card';

export default function OrderTabView() {
  const { orders, orderItems, isLoading } = useOrderTab();
  const { mainSection } = useAtomValue(windowStateAtom);
  const orderCardList = useMemo(() => {
    return generateCardLayoutArr({
      orders,
      orderItems,
      maxHeight: mainSection.height,
    });
  }, [orders, orderItems, mainSection.height]);
  const isDataEmpty = orders.length === 0;

  if (isLoading) return <LoadingSpinner />;

  return (
    <ListUlBox isDataEmpty={isDataEmpty} sectionWidth={mainSection.width} tab='order'>
      {isDataEmpty ? (
        <ExceptionText text='표시할 주문이 없습니다.' />
      ) : (
        orderCardList?.map((order, idx) => {
          return <Card key={order.footer.orderId + idx} order={order} />;
        })
      )}
    </ListUlBox>
  );
}
