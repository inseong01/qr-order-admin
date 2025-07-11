import { atom, useAtom, useSetAtom } from 'jotai';

import { setWidgetAtomState } from '@/store/atom/widget-atom';

import { useConfirmModal } from '../../confirm/hook/use-confirm-modal';
import styles from './add-category-form.module.css';

// 분류 추가 폼의 입력 값을 관리하는 Atom
const addCategoryInputAtom = atom('');

/**
 * 새로운 메뉴 분류를 추가하는 컴포넌트입니다.
 * 분류명 입력에 대한 자체 상태를 관리합니다.
 */
export default function AddCategoryForm() {
  const [inputValue, setInputValue] = useAtom(addCategoryInputAtom);
  const { showConfirmModal } = useConfirmModal();
  const setWidgetState = useSetAtom(setWidgetAtomState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWidgetState({ option: '' });
    const title = '새로운 분류를 추가하겠습니까?';
    const onConfirm = () => {
      // TODO: 실제 제출 로직 구현 (예: API 호출)
      // supabase menu-category 테이블로 값 전달 (title로써 할당, id는 자동할당)
      console.log('새 분류 제출:', inputValue);
      // 처리 완료 되면 선택 초기화 O
      // 그렇지 않으면 선택 초기화 X
      // 모달 창 닫으면 선택 초기화 O
      setInputValue(''); // 제출 후 입력 초기화
    };
    showConfirmModal({ title, onConfirm });
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
