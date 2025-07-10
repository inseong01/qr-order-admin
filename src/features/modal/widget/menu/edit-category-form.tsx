import { atom, useAtom } from 'jotai';

import styles from './edit-category-form.module.css';

// 분류 편집 폼의 상태를 관리하는 Atoms
const selectedCategoriesAtom = atom<string[]>([]); // 선택된 분류의 ID를 저장
const categoryListAtom = atom([
  // 이 데이터는 일반적으로 API를 통해 가져옵니다.
  { id: '1', title: '메인 메뉴' },
  { id: '2', title: '사이드 메뉴' },
  { id: '3', title: '음료' },
]);

/**
 * 기존 메뉴 분류를 편집하는 컴포넌트입니다.
 * 선택된 항목에 대한 자체 상태를 관리합니다.
 */
export default function EditCategoryForm() {
  const [categoryList] = useAtom(categoryListAtom);
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as any).submitter;
    const action = submitter.name;

    if (action === 'delete') {
      // TODO: 삭제 로직 구현
      console.log('분류 삭제:', selectedCategories);
    } else if (action === 'update') {
      // TODO: 수정 로직 구현 (다른 뷰나 모달이 필요할 수 있음)
      console.log('분류 수정:', selectedCategories);
    }
    setSelectedCategories([]); // 선택 초기화
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSelectedCategories((prev) => (checked ? [...prev, id] : prev.filter((catId) => catId !== id)));
  };

  return (
    <form className={styles.submitForm} onSubmit={handleSubmit}>
      <div className={styles.sortModal}>
        <div className={styles.title}>분류 수정/삭제</div>
        <ul className={styles.submitInfo}>
          {categoryList.map((category) => (
            <li key={category.id} className={styles.list}>
              <label htmlFor={category.id} className={styles.left}>
                {category.title}
              </label>
              <input
                type='checkbox'
                id={category.id}
                name='check'
                className={styles.right}
                checked={selectedCategories.includes(category.id)}
                onChange={handleCheckboxChange}
              />
            </li>
          ))}
        </ul>
        <div className={styles.submitBtn}>
          <input type='submit' className={`${styles.btn} ${styles.delete}`} value='삭제하기' name='delete' />
          <input type='submit' className={styles.btn} value='수정하기' name='update' />
        </div>
      </div>
    </form>
  );
}
