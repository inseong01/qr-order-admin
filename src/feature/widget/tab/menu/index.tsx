import useEditorClickHandler from '@/hook/widget/use-click-editor';

import CategoryGroup from '../../components/category/category-group';

import MenuFirstCategory from './first-category';

export default function MenuWidget() {
  const { clickEditor } = useEditorClickHandler();

  return (
    <CategoryGroup>
      {/* 첫번째 카테고리 */}
      <MenuFirstCategory clickEditor={clickEditor} />
    </CategoryGroup>
  );
}
