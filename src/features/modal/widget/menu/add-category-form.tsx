import { atom, useAtom } from 'jotai';

import styles from './add-category-form.module.css';

// 분류 추가 폼의 입력 값을 관리하는 Atom
const addCategoryInputAtom = atom('');

/**
 * 새로운 메뉴 분류를 추가하는 컴포넌트입니다.
 * 분류명 입력에 대한 자체 상태를 관리합니다.
 */
export default function AddCategoryForm() {
  const [inputValue, setInputValue] = useAtom(addCategoryInputAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 실제 제출 로직 구현 (예: API 호출)
    console.log('새 분류 제출:', inputValue);
    setInputValue(''); // 제출 후 입력 초기화
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className={`${styles.submitForm} ${styles.category}`} onSubmit={handleSubmit}>
      <div className={styles.sortModal}>
        <div className={styles.title}>분류 추가</div>
        <ul className={styles.submitInfo}>
          <li className={styles.info}>
            <input
              required
              type='text'
              className={styles.input}
              name='title'
              value={inputValue}
              onChange={handleInputChange}
              placeholder='분류명을 입력해주세요'
            />
          </li>
        </ul>
        <div className={styles.submitBtn}>
          <input type='submit' className={styles.btn} value='추가하기' />
        </div>
      </div>
    </form>
  );
}
