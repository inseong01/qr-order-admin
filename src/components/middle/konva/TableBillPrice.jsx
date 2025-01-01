import { Group, Line, Text } from 'react-konva';

export default function TableBillPrice({ order, bottom }) {
  const totalPrice =
    order
      ?.reduce(
        (prev, list) =>
          prev +
          list.orderList?.reduce((prevPrice, currMenu) => prevPrice + currMenu.price * currMenu.amount, 0),
        0
      )
      .toLocaleString() ?? 0;

  return (
    <Group x={20} y={bottom.y}>
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
