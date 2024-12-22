import { Group, Rect, RegularPolygon, Text } from 'react-konva';
import { useSelector } from 'react-redux';

export default function RequestMesgGroup({ tableNum, requestMsg }) {
  const tableRequestAlertOn = useSelector((state) => state.realtimeState.tableRequestList.isOn);

  return (
    <>
      {!tableRequestAlertOn &&
        requestMsg.list.map((request, idx) => {
          const { pos, table } = requestMsg;

          return (
            <Group key={idx} x={pos.x} y={pos.y}>
              <Group x={pos.flip ? pos.width : 0}>
                <RegularPolygon
                  sides={3}
                  width={20}
                  height={20}
                  y={table.rec.height / 2}
                  rotation={pos.flip ? 90 : 30}
                  fill="white"
                />
              </Group>
              <Group x={0} offsetY={-(table.rec.height / 4)}>
                <Rect
                  width={pos.width}
                  height={table.rec.height / 2}
                  offsetX={pos.flip ? 0 : 0}
                  cornerRadius={5}
                  fill="white"
                />
                <Group x={15} offsetY={-(table.rec.height / 4) + 5}>
                  <Text width={pos.width - 30} text={request} fontSize={16} align="center" />
                </Group>
              </Group>
            </Group>
          );
        })}
    </>
  );
}
