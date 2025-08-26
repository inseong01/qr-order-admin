import { ChangeEvent } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { setWidgetAtomState } from '@/features/widget/store/atom';
import { showToastAtom } from '@/features/alert/toast/store/atom';

import { MENU_CATEGORIES_QUERY_KEY, useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { deleteMenuCategory, MenuCategory } from '@/lib/supabase/tables/menu-category';

import validate from '@/utils/function/validate';

import { useConfirmModal } from '../../../../confirm/hook/use-confirm-modal';
import SubmitButton from '../button/button';
import { SubmitFormBox, SubmitInfoBox, TitleBox } from '../common';
import { selectedCategoryIdsAtom } from '../../store/atom';
import styles from './delete-form.module.css';
import { deleteImageByFileName, STORE } from '@/lib/supabase/storage/store';

/**
 * 기존 메뉴 분류를 삭제하는 컴포넌트
 */
export default function DeleteCategoryForm() {
  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoryIdsAtom);
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const menuQuery = useQueryMenuList();
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const showToast = useSetAtom(showToastAtom);
  const { showConfirmModal } = useConfirmModal();

  /* 비즈니스 로직 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const title = '선택한 분류를 삭제하겠습니까?';

    // 값 검증
    const { success, data, error } = await validate.deleteCategoryValue(selectedCategories);
    if (!success) {
      const message = error?.issues[0].message;
      showToast(message);
      setWidgetState({ option: 'delete-menu-category' });
      return e.preventDefault();
    }

    /* 비즈니스 로직 */
    const onConfirm = async () => {
      // supabase 전달
      try {
        await deleteMenuCategory(data);

        const filePath = menuQuery.data?.map((m) => STORE + m.img_url) ?? [];
        await deleteImageByFileName({ filePath });

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

      {/* 제출 */}
      <SubmitButton value='삭제하기' />
    </SubmitFormBox>
  );
}
