import { AnimatePresence, motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../../../lib/store/use-bound-store';
import { OptionNumList } from '../../../../../lib/store/slices/widget-slice';
import { TableDataArr } from '../../../../../lib/supabase/function/fetch-table';
import { FetchMethod } from '../../../../../lib/store/slices/fetch-slice';

import Category from '../components/category';
import IconWrap from '../components/icon';
import CategoryIcon from '../components/icon/category-icon';
import Option from '../components/option';
import OptionGroup from '../components/option/option-group';
import RequestMsgToggle from '../components/toggle';

export default function TableSecondCategory({
  clickEditor,
}: {
  clickEditor: (optNum: OptionNumList, dataArr?: TableDataArr<FetchMethod>) => () => void;
}) {
  const secondOption = useBoundStore((state) => state.widget.openOptionList[2]);
  const toggleRequestAlert = useBoundStore((state) => state.toggleRequestAlert);

  function onClickAlertEditor() {
    toggleRequestAlert();
  }

  return (
    <Category>
      {/* 아이콘 */}
      <CategoryIcon clickEditor={clickEditor(2)}>
        <IconWrap>
          <FontAwesomeIcon icon={faBell} size='1x' />
        </IconWrap>
      </CategoryIcon>

      {/* 두번째 카테고리 목록 */}
      <AnimatePresence>
        {secondOption && (
          <OptionGroup onClick={onClickAlertEditor}>
            <Option>
              <RequestMsgToggle />
            </Option>
          </OptionGroup>
        )}
      </AnimatePresence>
    </Category>
  );
}
