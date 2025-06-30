import { AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';
import { KonvaEditType } from '../../../../lib/store/slices/konva-slice';
import { OptionNumList } from '../../../../lib/store/slices/widget-slice';
import { FetchMethod } from '../../../../lib/store/slices/fetch-slice';
import { TableDataArr } from '../../../../lib/supabase/function/fetch-table';

import Category from '../../components/category';
import CategoryIcon from '../../components/icon/category-icon';
import EditIconAnimation from '../../components/icon/edit-icon-animation';
import Option from '../../components/option';
import TextBox from '../../components/option/text-box';
import OptionGroup from '../../components/option/option-group';

export default function TableFirstCategory({
  clickEditor,
}: {
  clickEditor: (optNum: OptionNumList, dataArr: TableDataArr<FetchMethod>) => () => void;
}) {
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);
  const editTableType = useBoundStore((state) => state.konva.type);
  const tableListData = useBoundStore((state) => state.itemBox.clientTableList);
  const tableIdArr = useBoundStore((state) => state.konva.target.id);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const submitError = useBoundStore((state) => state.submit.isError);

  const changeKonvaEditState = useBoundStore((state) => state.changeKonvaEditState);

  const dataArr = editTableType === 'delete' ? tableIdArr : tableListData;

  function onClickEnableEditTable(editType: KonvaEditType) {
    return () => {
      if (submitError) return;
      if (editTableType !== editType && editTableisEditing) {
        // 편집 중에 다른 editType으로 변환 제한
        return alert('편집 중에 변경할 수 없습니다.');
      }
      changeKonvaEditState({ editType });
    };
  }

  return (
    <Category>
      {/* 아이콘 */}
      <CategoryIcon clickEditor={clickEditor(1, dataArr)}>
        <EditIconAnimation />
      </CategoryIcon>

      {/* 카테고리 목록 */}
      <AnimatePresence>
        {firstOption && (
          <OptionGroup>
            {/* 테이블 생성 */}
            <Option openEditor={onClickEnableEditTable('insert')}>
              <TextBox text='생성' />
            </Option>

            {/* 테이블 수정 */}
            <Option openEditor={onClickEnableEditTable('update')}>
              <TextBox text='수정' />
            </Option>

            {/* 테이블 삭제 */}
            <Option openEditor={onClickEnableEditTable('delete')}>
              <TextBox text='삭제' />
            </Option>
          </OptionGroup>
        )}
      </AnimatePresence>
    </Category>
  );
}
