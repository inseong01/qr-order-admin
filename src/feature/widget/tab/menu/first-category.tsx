import { AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';
import { OptionNumList } from '../../../../lib/store/slices/widget-slice';
import { TableDataArr } from '../../../../lib/supabase/function/fetch-table';
import { FetchMethod } from '../../../../lib/store/slices/fetch-slice';
import { ModalType } from '../../../../lib/store/slices/modal-slice';

import Category from '../../components/category';
import EditIconAnimation from '../../components/icon/edit-icon-animation';
import CategoryIcon from '../../components/icon/category-icon';
import Option from '../../components/option';
import TextBox from '../../components/option/text-box';
import OptionGroup from '../../components/option/option-group';

export default function MenuFirstCategory({
  onClickEditor,
}: {
  onClickEditor: (optNum: OptionNumList, dataArr: TableDataArr<FetchMethod>) => () => void;
}) {
  const tableListData = useBoundStore((state) => state.itemBox.clientTableList);
  const editTableType = useBoundStore((state) => state.konva.type);
  const tableIdArr = useBoundStore((state) => state.konva.target.id);
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);
  const submitError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const resetItemState = useBoundStore((state) => state.resetItemState);

  const dataArr = editTableType === 'delete' ? tableIdArr : tableListData;

  function openEditor(modalType: ModalType) {
    return () => {
      // 바로 닫히기 때문에 처리 중 반환하여 연속 제출 제한
      if (isSubmit) return;
      if (submitError) return;

      // 위젯 아이템 초기화
      resetItemState();
      changeModalState({ type: modalType, isOpen: true });
    };
  }

  return (
    <Category>
      {/* 아이콘 */}
      <CategoryIcon clickEditor={onClickEditor(1, dataArr)}>
        <EditIconAnimation />
      </CategoryIcon>

      {/* 카테고리 목록 */}
      <AnimatePresence>
        {firstOption && (
          <OptionGroup>
            {/* 메뉴 분류 */}
            <Option openEditor={openEditor('update-category')}>
              <TextBox text='분류' />
            </Option>
          </OptionGroup>
        )}
      </AnimatePresence>
    </Category>
  );
}
