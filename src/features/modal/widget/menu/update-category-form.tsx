import { ChangeEvent } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';
import { setWidgetAtomState } from '@/features/widget/store/atom';

import { MENU_CATEGORIES_QUERY_KEY } from '@/hooks/use-query/query';
import { MenuCategory, updateMenuCategory } from '@/lib/supabase/tables/menu-category';
import validate from '@/utils/function/validate';

import { useConfirmModal } from '../../confirm/hook/use-confirm-modal';
import styles from './update-category-form.module.css';

// 분류 편집 폼의 상태를 관리하는 Atoms
const selectedCategoriesAtom = atom<Record<string, any>>({}); // 선택된 분류의 ID, title 저장

/**
 * 기존 메뉴 분류를 편집하는 컴포넌트입니다.
 * 선택된 항목에 대한 자체 상태를 관리합니다.
 */
export default function UpdateCategoryForm() {
  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const { showConfirmModal } = useConfirmModal();
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWidgetState({ option: '' });

    const title = '선택한 분류를 수정하겠습니까?';

    const onConfirm = async () => {
      const updatedCategories = Object.values(selectedCategories);
      const { success, data, error } = await validate.updateCategoryValue(updatedCategories); // 값 검증

      if (!success) {
        const message = error?.issues[0].message;
        alert(message);
        return;
      }

      try {
        await updateMenuCategory(data); // supabase 전달
        openSubmissionStatusAlert('수정되었습니다'); // 데이터 처리 상태 알림
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
  }

  function handleTyping(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setSelectedCategories((prev) => {
      return {
        ...prev,
        [id]: { id, title: value },
      };
    });
  }

  return (
    <form className={styles.submitForm} onSubmit={handleSubmit}>
      <div className={styles.sortModal}>
        {/* 제목 */}
        <div className={styles.title}>분류 수정</div>

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
                  checked={Object.hasOwn(selectedCategories, id)}
                  onChange={handleCheckboxChange}
                />
              </label>

              {Object.hasOwn(selectedCategories, id) && (
                <input
                  type='text'
                  id={id}
                  name='title'
                  className={styles.right}
                  value={selectedCategories[id]?.title ?? ''}
                  onChange={handleTyping}
                />
              )}
            </li>
          ))}
        </ul>
        <div className={styles.submitBtn}>
          <input type='submit' className={styles.btn} value='수정하기' name='update' />
        </div>
      </div>
    </form>
  );
}
