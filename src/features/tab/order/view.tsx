import { useMemo } from 'react';
import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/window-atom';
import { ExceptionText } from '@/components/ui/exception';

import Card from './components/card';
import { useOrderTab } from './hooks/use-order-tab';
import { generateCardLayoutArr } from './util/generate-card-layout-arr';
import { ListUlBox } from '../components/list-box';
import ErrorComponent from '@/features/page/error';
import { DataComponentProps, DataWrapperProps } from './types';

export default function OrderTabView() {
  const { orders, orderItems, isEmpty, isLoading, isError } = useOrderTab();
  const { mainSection } = useAtomValue(windowStateAtom);
  const orderCardList = useMemo(() => {
    return generateCardLayoutArr({
      orders,
      orderItems,
      maxHeight: mainSection.height,
    });
  }, [orders, orderItems, mainSection.height]);

  if (isLoading) return <ExceptionText text='주문 목록 불러오는 중...' />;

  return (
    <ListUlBox isDataEmpty={isEmpty === true} sectionWidth={mainSection.width} tab='order'>
      <DataWrapper data={{ orderCardList, isEmpty }} error={isError} />
    </ListUlBox>
  );
}

function DataWrapper({ data, error }: DataWrapperProps) {
  if (error) {
    return <ErrorComponent />;
  }

  if (data.isEmpty === true) {
    return <ExceptionText text='표시할 주문이 없습니다.' />;
  }

  return <DataComponent data={data} />;
}

function DataComponent({ data }: DataComponentProps) {
  const { orderCardList } = data;

  return (
    <>
      {orderCardList?.map((order, idx) => {
        return <Card key={order.footer.orderId + idx} order={order} />;
      })}
    </>
  );
}
