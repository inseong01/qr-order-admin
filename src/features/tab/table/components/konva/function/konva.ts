import { v4 as uuidv4 } from 'uuid';

import { Table } from '@/lib/supabase/function/table';

/**
 * 새로운 테이블 객체를 생성합니다.
 * @param stageSize Konva Stage의 크기
 * @param clientTableList 현재 클라이언트에 있는 테이블 목록
 * @returns 새로 생성된 테이블 객체
 */
export function createNewTable(
  stageSize: {
    stageWidth: number;
    stageHeight: number;
  },
  clientTableList: Table[]
) {
  // 사용 중이지 않은 가장 낮은 테이블 번호를 찾습니다.
  let newTableNumber = 1;
  const usedNumbers = new Set(clientTableList.map((t) => t.number));
  while (usedNumbers.has(newTableNumber)) {
    newTableNumber++;
  }

  const newTable: Table = {
    id: uuidv4(),
    number: newTableNumber,
    meta: {
      x: stageSize.stageWidth / 2,
      y: stageSize.stageHeight / 2 - 130,
      rec: { width: 170, height: 130 },
      tableText: { width: 100 },
      bottom: {
        y: 90,
        line: { points: [0, 0, 130, 0] },
        priceText: { width: 130 },
      },
    },
  };
  return newTable;
}
