import { ChangeEvent } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';

import categoryDummy from '@/mock/menu_category.test.json';
import { setWidgetAtomState } from '@/store/atom/widget-atom';

import { useConfirmModal } from '../../confirm/hook/use-confirm-modal';
import styles from './update-category-form.module.css';

// 분류 편집 폼의 상태를 관리하는 Atoms
const selectedCategoriesAtom = atom<Record<string, any>>({}); // 선택된 분류의 ID, title 저장
const categoryListAtom = atom(categoryDummy);

/**
 * 기존 메뉴 분류를 편집하는 컴포넌트입니다.
 * 선택된 항목에 대한 자체 상태를 관리합니다.
 */
export default function UpdateCategoryForm() {
  const [categoryList] = useAtom(categoryListAtom);
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);
  const { showConfirmModal } = useConfirmModal();
  const setWidgetState = useSetAtom(setWidgetAtomState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWidgetState({ option: '' });
    const title = '선택한 분류를 수정하겠습니까?';
    const onConfirm = () => {
      // TODO: 삭제 로직 구현
      // upsert: supabase menu-category 테이블로 { id, title }[] 전달
      // 처리 완료 되면 선택 초기화 O
      // 그렇지 않으면 선택 초기화 X
      // 모달 창 닫으면 선택 초기화 O
      setSelectedCategories([]); // 선택 초기화
    };
    showConfirmModal({ title, onConfirm });
  };

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    setSelectedCategories((prev) => {
      if (checked) {
        return {
          ...prev,
          [id]: { title: '' },
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
        [id]: { value },
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
          {categoryList.map((category) => (
            <li key={category.id} className={styles.list}>
              <label htmlFor={category.id} className={styles.left}>
                <span>{category.title}</span>

                <input
                  type='checkbox'
                  id={category.id}
                  name='check'
                  className={styles.check}
                  checked={Object.hasOwn(selectedCategories, category.id)}
                  onChange={handleCheckboxChange}
                />
              </label>

              {Object.hasOwn(selectedCategories, category.id) && (
                <input
                  type='text'
                  id={category.id}
                  name='title'
                  className={styles.right}
                  value={selectedCategories[category.id].value}
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
