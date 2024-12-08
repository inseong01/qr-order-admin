import styles from '@/style/middle/konva/TableDraw.module.css';
import { useEffect, useState } from 'react';

import { Circle, Group, Layer, Line, Rect, Stage, Text } from 'react-konva';

// stage -> layer -> shape(group), layer 여러 개로 배치
export default function TableDraw({ stageSize }) {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTotalPrice(1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stage width={stageSize.stageWidth} height={stageSize.stageHeight} className={styles.stage}>
      <Layer>
        <Group>
          <Rect width={170} height={130} fill={'white'} cornerRadius={10} />
          <Group x={20} y={20}>
            <Text text="테이블 1" width={100} fill={'#8D8D8D'} fontSize={18} align="left" />
          </Group>
          <Group x={20} y={90}>
            <Line points={[0, 0, 130, 0]} strokeWidth={1} stroke={'#8D8D8D'} />
            <Group x={0} y={10}>
              <Text text="합계" width={130} fill={'#8D8D8D'} fontSize={15} align="left" />
              <Text text={`${totalPrice}원`} width={130} fill={'#8D8D8D'} fontSize={15} align="right" />
            </Group>
          </Group>
        </Group>
      </Layer>
    </Stage>
  );
}
