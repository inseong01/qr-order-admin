'use client';

import { Layer, Stage, Text } from 'react-konva';

export default function TableDraw() {
  return (
    <Stage width={100} height={100}>
      <Layer>
        <Text text="Try to konva" />
      </Layer>
    </Stage>
  );
}
