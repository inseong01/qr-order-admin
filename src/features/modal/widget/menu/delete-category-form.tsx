import { ChangeEvent } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { setWidgetAtomState } from '@/features/widget/store/atom';
import { openSubmissionAlertAtom } from '@/features/alert/popup/store/atom';

import { MENU_CATEGORIES_QUERY_KEY, useQueryMenuCategoryList } from '@/hooks/use-query/query';

import { deleteMenuCategory, MenuCategory } from '@/lib/supabase/tables/menu-category';

import validate from '@/utils/function/validate';

import { useConfirmModal } from '../../confirm/hook/use-confirm-modal';
import { SubmitInfoBox } from './components/submit-info/submit-info';
import SubmitButton from './components/button/button';
import TitleBox from './components/title/title';
import { selectedCategoryIdsAtom } from './store/atom';
import styles from './delete-category-form.module.css';

/**
 * 기존 메뉴 분류를 삭제하는 컴포넌트
 */
export default function DeleteCategoryForm() {
  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoryIdsAtom);
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const openSubmissionAlert = useSetAtom(openSubmissionAlertAtom);
  const { showConfirmModal } = useConfirmModal();

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const updatedCategories = Object.values(selectedCategories);
    if (!updatedCategories.length) {
      alert('분류 항목을 선택해주세요.');
      return e.preventDefault();
    }

    const title = '선택한 분류를 삭제하겠습니까?';
    const onConfirm = async () => {
      const { success, data, error } = await validate.deleteCategoryValue(selectedCategories); // 값 검증
      if (!success) {
        const message = error?.issues[0].message;
        alert(message);
        setSelectedCategories([]);
        return;
      }

      try {
        await deleteMenuCategory(data); // supabase 전달
        await menuCategoriesQuery.refetch();
        openSubmissionAlert('삭제되었습니다'); // 데이터 처리 상태 알림
      } catch (e) {
        console.log(e);
        openSubmissionAlert('오류가 발생했습니다');
      } finally {
        setSelectedCategories([]);
      }
    };
    const onCancle = () => {
      setSelectedCategories([]);
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
    <form className={styles.submitForm} onSubmit={handleSubmit}>
      <div className={styles.sortModal}>
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
      </div>
    </form>
  );
}
