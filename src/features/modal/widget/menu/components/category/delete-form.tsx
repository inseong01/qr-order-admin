import { ChangeEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { setWidgetAtomState } from '@/features/widget/store/atom';
import { showToastAtom } from '@/features/alert/toast/store/atom';

import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import { MENU_CATEGORIES_QUERY_KEY, useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { deleteMenuCategory, MenuCategory } from '@/lib/supabase/tables/menu-category';
import { deleteImageByFileName, STORE } from '@/lib/supabase/storage/store';

import validate from '@/utils/function/validate';

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
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoryIdsAtom);
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const categoryError = useAtomValue(categoryErrorAtom);
  const menuQuery = useQueryMenuList();
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const showToast = useSetAtom(showToastAtom);
  const setCategoryError = useSetAtom(setCategoryErrorAtom);
  const { showConfirmModal } = useConfirmModal();

  /* 비즈니스 로직 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const title = '선택한 분류를 삭제하겠습니까?';

    // 값 검증
    const { success, data, error } = await validate.deleteCategoryValue(selectedCategories);
    if (!success) {
      const message = error?.issues[0].message;
      setCategoryError(message);
      setWidgetState({ option: 'delete-menu-category' });
      return e.preventDefault();
    }

    const onConfirm = async () => {
      // supabase 전달
      try {
        const filePath = menuQuery.data?.map((m) => (!m.img_url.includes('default') ? '' : STORE + m.img_url)) ?? [];
        await deleteImageByFileName({ filePath });

        await deleteMenuCategory(data);

        await menuCategoriesQuery.refetch();
      } catch (e) {
        console.error(e);
        showToast('오류가 발생했습니다.');
        return;
      }

      // 데이터 처리 상태 알림
      showToast('삭제되었습니다.');

      // 초기화
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
