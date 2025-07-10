import { useSetAtom } from 'jotai';
import { RefObject, useRef } from 'react';
import { Group, Line, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';

import { selectIdState } from '@/store/atom/id-atom';
import { Table } from '@/lib/supabase/function/table';
import { setTabModalAtomState } from '@/features/modal/tab/store/atom';

import { SetClientTableList } from '..';

// TODO: Konva 테이블 조작 관련 훅 (useOpenTableInfo, useEditTable 등) 구현 필요

export default function TableLayer({
  table,
}: {
  stageRef: RefObject<Konva.Stage>;
  table: Table;
  setClientTableList: SetClientTableList;
}) {
  const selectId = useSetAtom(selectIdState);
  const setTableModal = useSetAtom(setTabModalAtomState);

  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const { meta, number, id } = table;
  const totalPrice = 0; // TODO: 실제 주문 총액 계산 로직 필요

  // 기능: 테이블 선택 시 정보 모달 열기
  function handleSelectTable() {
    selectId(id);
    setTableModal('table-info');
    // TODO: 테이블 편집 로직 연동 (onClickEditTable)
  }

  // 기능: Transformer 활성화 (주석 처���된 원본 로직)
  // useEffect(() => { ... });

  // 기능: 드래그/변형 시 시각적 효과 (주석 처리된 원본 로직)
  // useEffect(() => { ... });

  return (
    <Group
      key={id}
      id={id}
      x={meta.x}
      y={meta.y}
      onClick={handleSelectTable}
      onTap={handleSelectTable}
      // TODO: 드래그, 커서 변경 등 이벤트 핸들러 구현 필요
      // draggable={isTransformerAble}
      // onDragMove={onDragMove}
      // onDragEnd={onDragEnd('onDragMoveEnd')}
      // onMouseEnter={onMouseEnterChangePointer}
      // onMouseLeave={onMouseLeaveChangePointer}
    >
      <Rect
        ref={shapeRef}
        width={meta.rec.width}
        height={meta.rec.height}
        fill={'#fff'}
        stroke={'white'}
        cornerRadius={10}
        // TODO: 변형 이벤트 핸들러 구현 필요
        // onTransformStart={onDragTransformStart}
        // onTransformEnd={onDragEnd('onDragTransformEnd')}
      />
      {/* 
        TODO: Transformer 구현 필요
        {isTransformerAble && (
          <Transformer
            ref={trRef}
            ...
          />
        )}
      */}
      <Group x={20} y={20}>
        <Text text={`테이블 ${number}`} width={meta.tableText.width} fill={'#222'} fontSize={18} align='left' />
      </Group>
      <Group x={20} y={meta.bottom.y}>
        <Line points={meta.bottom.line.points} strokeWidth={1} stroke={'#8D8D8D'} />
        <Group x={0} y={10}>
          <Text text='합계' width={meta.bottom.priceText.width} fill={'#8D8D8D'} fontSize={15} align='left' />
          <Text
            text={`${totalPrice}원`}
            width={meta.bottom.priceText.width}
            fill={'#8D8D8D'}
            fontSize={15}
            align='right'
          />
        </Group>
      </Group>
    </Group>
  );
}
