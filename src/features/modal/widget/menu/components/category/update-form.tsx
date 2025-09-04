import { ChangeEvent, FormEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { setWidgetAtomState } from '@/features/widget/store/atom';

import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import { MENU_CATEGORIES_QUERY_KEY, useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { MenuCategory, updateMenuCategory } from '@/lib/supabase/tables/menu-category';
import validate from '@/utils/function/validate';

import { useConfirmModal } from '../../../../confirm/hook/use-confirm-modal';
import { categoryErrorAtom, selectedCategoriesAtom, setCategoryErrorAtom } from '../../store/atom';
import { SubmitFormBox, SubmitInfoBox, TitleBox } from '../common';
import SubmitButton from '../button/button';
import styles from './update-form.module.css';

/**
 * 기존 메뉴 분류를 수정하는 컴포넌트
 */
export default function UpdateCategoryForm() {
  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const categoryError = useAtomValue(categoryErrorAtom);
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const showToast = useSetAtom(showToastAtom);
  const setCategoryError = useSetAtom(setCategoryErrorAtom);
  const { showConfirmModal } = useConfirmModal();
  /* 비즈니스 로직 */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const title = '선택한 분류를 수정하겠습니까?';

    // 값 검증
    const updatedCategories = Object.values(selectedCategories);
    const { success, data, error } = await validate.updateCategoryValue(updatedCategories);
    if (!success) {
      const message = error?.issues[0].message;
      setCategoryError(message);
      return e.preventDefault();
    }

    const onConfirm = async () => {
      // supabase 전달
      try {
        await updateMenuCategory(data);
        await menuCategoriesQuery.refetch();
        await menuListQuery.refetch();
      } catch (e) {
        console.error(e);
        showToast('오류가 발생했습니다.');
        return;
      }

      // 데이터 처리 상태 알림
      showToast('수정되었습니다.');

      // 초기화
      setSelectedCategories([]);
    };
    const onCancle = () => {
      setWidgetState({ option: 'update-menu-category' });
    };

    e.preventDefault();
    setWidgetState({ option: '' });
    showConfirmModal({ title, onConfirm, onCancle });
  };

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    setSelectedCategories((prev) => {
      if (checked) {
        return {
          ...prev,
          [id]: { id, title: '' },
        };
      } else {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
    });
    setCategoryError('');
  }

  function handleTyping(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setSelectedCategories((prev) => {
      return {
        ...prev,
        [id]: { id, title: value },
      };
    });
    setCategoryError('');
  }

  return (
    <SubmitFormBox onSubmit={handleSubmit}>
      {/* 제목 */}
      <TitleBox>분류 수정</TitleBox>

      {/* 목록 */}
      <SubmitInfoBox>
        {categories.data?.map(({ id, title }) => (
          <li key={id} className={styles.info}>
            <label htmlFor={id} className={styles.top}>
              <span>{title}</span>

              <input
                type='checkbox'
                id={id}
                name='check'
                className={styles.check}
                checked={Object.hasOwn(selectedCategories, id)}
                onChange={handleCheckboxChange}
              />
            </label>

            {Object.hasOwn(selectedCategories, id) && (
              <input
                type='text'
                id={id}
                name='title'
                placeholder='분류명을 작성해주세요.'
                className={styles.bottom}
                value={selectedCategories[id]?.title ?? ''}
                onChange={handleTyping}
              />
            )}
          </li>
        ))}
      </SubmitInfoBox>

      <FormInputBox>
        {/* 오류 메시지 */}
        <FormInputCaption hasError={Boolean(categoryError)} text={categoryError} align='center' />

        {/* 제출 */}
        <SubmitButton value='수정하기' />
      </FormInputBox>
    </SubmitFormBox>
  );
}
