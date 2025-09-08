import { ChangeEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { setWidgetAtomState } from '@/features/widget/store/atom';

import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import { useQueryMenuList } from '@/hooks/use-query/menu/query';
import { MENU_CATEGORIES_QUERY_KEY } from '@/hooks/use-query/query-key';
import { useMutationDeleteMenuCategory } from '@/hooks/use-query/menu-category/query';

import { MenuCategory } from '@/lib/supabase/tables/menu-category';

import validate from '@/util/function/validate';

import { useConfirmModal } from '../../../../confirm/hook/use-confirm-modal';
import { categoryErrorAtom, selectedCategoryIdsAtom, setCategoryErrorAtom } from '../../store/atom';
import { SubmitFormBox, SubmitInfoBox, TitleBox } from '../common';
import SubmitButton from '../button/button';
import styles from './delete-form.module.css';

/**
 * 기존 메뉴 분류를 삭제하는 컴포넌트
 */
export default function DeleteCategoryForm() {
  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });
  const menuQuery = useQueryMenuList();

  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoryIdsAtom);
  const categoryError = useAtomValue(categoryErrorAtom);
  const setCategoryError = useSetAtom(setCategoryErrorAtom);
  const setWidgetState = useSetAtom(setWidgetAtomState);

  const { showConfirmModal } = useConfirmModal();
  const deleteCategoryMutation = useMutationDeleteMenuCategory();

  /* 비즈니스 로직 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const title = '선택한 분류를 삭제하겠습니까?';

    // 값 검증
    const { success, data, error } = await validate.deleteCategoryValue(selectedCategories);
    if (!success) {
      const message = error?.issues[0].message;
      setCategoryError(message);
      return e.preventDefault();
    }

    const onConfirm = async () => {
      const filePath =
        menuQuery.data
          ?.filter((m) => data.includes(m.menu_category.id))
          .map((m) => m.img_url.split('qr-order-img')?.at(-1) ?? '')
          .filter((url) => url && !url.includes('menu_default')) ?? [];

      deleteCategoryMutation.mutate({ ids: data, filePath });
      setSelectedCategories([]);
    };

    const onCancle = () => {
      setWidgetState({ option: 'delete-menu-category' });
    };

    e.preventDefault();
    setCategoryError('');
    setWidgetState({ option: '' });
    showConfirmModal({ title, onConfirm, onCancle });
  };

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return selectedCategories.filter((c) => c !== id);
      }
    });
    setCategoryError('');
  }

  return (
    <SubmitFormBox onSubmit={handleSubmit}>
      {/* 제목 */}
      <TitleBox>분류 삭제</TitleBox>

      {/* 목록 */}
      <SubmitInfoBox>
        {categories.data?.map(({ id, title }) => (
          <li key={id} className={styles.info}>
            <label htmlFor={id} className={styles.left}>
              <span>{title}</span>

              <input
                type='checkbox'
                id={id}
                name='check'
                className={styles.check}
                checked={selectedCategories.includes(id)}
                onChange={handleCheckboxChange}
              />
            </label>
          </li>
        ))}
      </SubmitInfoBox>

      <FormInputBox>
        {/* 오류 메시지 */}
        <FormInputCaption hasError={Boolean(categoryError)} text={categoryError} align='center' />

        {/* 제출 */}
        <SubmitButton value='삭제하기' />
      </FormInputBox>
    </SubmitFormBox>
  );
}
