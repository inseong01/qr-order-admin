import { Bottom, Order } from '../../../types/common';

import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Group, Line, Text } from 'react-konva';

export default function TableBillPrice({
  order,
  bottom,
  isDragging,
}: {
  order: Order[];
  bottom: Bottom;
  isDragging: boolean;
}) {
  const totalPrice =
    order
      ?.reduce(
        (prev, list) =>
          prev +
          list.orderList?.reduce((prevPrice, currMenu) => prevPrice + currMenu.price * currMenu.amount, 0),
        0
      )
      .toLocaleString() ?? 0;
  // useRef
  const billRef = useRef<Konva.Group>(null);

  // 좌석 변형 시 bottom 투명도 조절
  useEffect(() => {
    if (!billRef.current) return;
    if (isDragging) {
      billRef.current.to({
        opacity: 0,
        duration: 0.1,
      });
      return;
    }
    billRef.current.to({
      opacity: 1,
      duration: 0.3,
    });
  }, [isDragging]);

  return (
    <Group ref={billRef} x={20} y={bottom.y}>
      <Line points={bottom.line.points} strokeWidth={1} stroke={'#8D8D8D'} />
      <Group x={0} y={10}>
        <Text text="합계" width={bottom.priceText.width} fill={'#8D8D8D'} fontSize={15} align="left" />
        <Text
          text={`${totalPrice}원`}
          width={bottom.priceText.width}
          fill={'#8D8D8D'}
          fontSize={15}
          align="right"
        />
      </Group>
    </Group>
  );
}
