import useEditorClickHandler from '../../../../../hooks/widget/use-click-editor';
import { FetchMethod } from '../../../../../lib/store/slices/fetch-slice';
import { OptionNumList } from '../../../../../lib/store/slices/widget-slice';
import { useBoundStore } from '../../../../../lib/store/use-bound-store';
import { TableDataArr } from '../../../../../lib/supabase/function/fetch-table';

import CategoryGroup from '../components/category/category-group';
import TableFirstCategory from './first-category';
import TableSecondCategory from './second-category';

export default function TableWidget() {
  const { clickEditor } = useEditorClickHandler();

  return (
    <CategoryGroup>
      {/* 첫번째 카테고리 */}
      <TableFirstCategory clickEditor={clickEditor} />

      {/* 두번째 카테고리 */}
      <TableSecondCategory clickEditor={clickEditor} />
    </CategoryGroup>
  );
}
