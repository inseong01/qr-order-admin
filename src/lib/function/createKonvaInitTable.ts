import { StageSize } from '../../components/middle/konva/KonvaSection';
import { TableList } from '../../types/common';

import { v4 as uuidv4 } from 'uuid';

export default function createKonvaInitTable({
  stageSize,
  clientTableList,
}: {
  stageSize: StageSize;
  clientTableList: TableList[];
}) {
  /*
    없는 번호 알려면 사용하고 있는 번호를 알고 있어야 함 (정렬 필수)
    [1, 2, 4, 5] -> 0/1, 1/2, 2/4 X -> 인덱스와 일치하지 않음 -> 2/3 인덱스+1 숫자 사용
    [1, 2, 3] -> 0/1, 1/2, 2/3 O -> 인덱스와 일치 -> 인덱스+1 숫자 사용
  */
  let tableNum = 0;
  for (let i = 0; i < clientTableList.length + 1; i++) {
    if (i + 1 === clientTableList[i]?.tableNum) {
      continue;
    } else {
      tableNum = i + 1;
      break;
    }
  }

  const id = uuidv4();
  const newTable = {
    id,
    init: {
      x: stageSize.stageWidth / 2,
      y: stageSize.stageHeight / 2 - 130,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      bottom: {
        y: 90,
        line: { points: [0, 0, 130, 0] },
        priceText: {
          width: 130,
        },
      },
    },
    tableNum,
    order: [],
  };
  return newTable;
}
