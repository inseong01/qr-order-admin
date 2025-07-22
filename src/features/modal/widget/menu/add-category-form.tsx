import { atom, useAtom, useSetAtom } from 'jotai';

import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';
import { setWidgetAtomState } from '@/features/widget/store/atom';

import { addMenuCategory } from '@/lib/supabase/tables/menu-category';
import validate from '@/utils/function/validate';

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
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWidgetState({ option: '' });

    const title = '새로운 분류를 추가하겠습니까?';
    const onConfirm = async () => {
      const { success, data, error } = await validate.createCategoryValue(inputValue); // 값 검증

      if (!success) {
        const message = error?.issues[0].message;
        alert(message);
        return;
      }

      try {
        await addMenuCategory({ title: data }); // supabase 전달
        openSubmissionStatusAlert('추가되었습니다'); // 데이터 처리 상태 알림
      } catch (e) {
        console.error(e);
        openSubmissionStatusAlert('오류가 발생했습니다');
      }
    };

    setInputValue('');
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
