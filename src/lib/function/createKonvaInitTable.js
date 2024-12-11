import { v4 as uuidv4 } from 'uuid';

export default function createKonvaInitTable({ stageSize, clientTableList }) {
  const newTable = {
    id: uuidv4(),
    init: {
      x: stageSize.stageWidth / 2,
      y: stageSize.stageHeight / 2,
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
    tableName: `테이블 ${clientTableList.length + 1}`,
    orderList: [],
  };
  return newTable;
}