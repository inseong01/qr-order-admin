import { ChangeEvent } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { setWidgetAtomState } from '@/features/widget/store/atom';
import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';

import { MENU_CATEGORIES_QUERY_KEY } from '@/hooks/use-query/query';
import { deleteMenuCategory, MenuCategory } from '@/lib/supabase/tables/menu-category';
import validate from '@/utils/function/validate';

import { useConfirmModal } from '../../confirm/hook/use-confirm-modal';
import styles from './delete-category-form.module.css';

// 분류 편집 폼의 상태를 관리하는 Atoms
const selectedCategoriesAtom = atom<string[]>([]); // 선택된 분류의 ID, title 저장

/**
 * 기존 메뉴 분류를 편집하는 컴포넌트입니다.
 * 선택된 항목에 대한 자체 상태를 관리합니다.
 */
export default function DeleteCategoryForm() {
  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const { showConfirmModal } = useConfirmModal();
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWidgetState({ option: '' });

    const title = '선택한 분류를 삭제하겠습니까?';

    const onConfirm = async () => {
      const { success, data, error } = await validate.deleteCategoryValue(selectedCategories); // 값 검증

      if (!success) {
        const message = error?.issues[0].message;
        alert(message);
        return;
      }

      try {
        await deleteMenuCategory(data); // supabase 전달
        openSubmissionStatusAlert('삭제되었습니다'); // 데이터 처리 상태 알림
      } catch (e) {
        console.log(e);
        openSubmissionStatusAlert('오류가 발생했습니다');
      }
    };

    setSelectedCategories([]);
    showConfirmModal({ title, onConfirm });
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
        <div className={styles.title}>분류 삭제</div>

        {/* 목록 */}
        <ul className={styles.submitInfo}>
          {categories.data?.map(({ id, title }) => (
            <li key={id} className={styles.list}>
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
        </ul>
        <div className={styles.submitBtn}>
          <input type='submit' className={`${styles.btn} ${styles.delete}`} value='삭제하기' name='delete' />
        </div>
      </div>
    </form>
  );
}
