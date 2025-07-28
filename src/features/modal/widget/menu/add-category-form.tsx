import { useAtom, useSetAtom } from 'jotai';

import { useQueryMenuCategoryList } from '@/hooks/use-query/query';

import { openSubmissionAlertAtom } from '@/features/alert/popup/store/atom';
import { setWidgetAtomState } from '@/features/widget/store/atom';

import { addMenuCategory } from '@/lib/supabase/tables/menu-category';
import validate from '@/utils/function/validate';

import { useConfirmModal } from '../../confirm/hook/use-confirm-modal';
import { SubmitInfoBox } from './components/submit-info/submit-info';
import SubmitButton from './components/button/button';
import TitleBox from './components/title/title';
import { categoryInputAtom } from './store/atom';
import styles from './add-category-form.module.css';

/**
 * 새로운 메뉴 분류를 추가하는 컴포넌트
 */
export default function AddCategoryForm() {
  const [inputValue, setInputValue] = useAtom(categoryInputAtom);
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const openSubmissionAlert = useSetAtom(openSubmissionAlertAtom);
  const { showConfirmModal } = useConfirmModal();

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const title = '새로운 분류를 추가하겠습니까?';
    const onConfirm = async () => {
      const { success, data, error } = await validate.createCategoryValue(inputValue); // 값 검증
      if (!success) {
        const message = error?.issues[0].message;
        alert(message);
        setInputValue('');
        return;
      }

      try {
        await addMenuCategory({ title: data }); // supabase 전달
        await menuCategoriesQuery.refetch();
        openSubmissionAlert('추가되었습니다'); // 데이터 처리 상태 알림
      } catch (e) {
        console.error(e);
        openSubmissionAlert('오류가 발생했습니다');
      } finally {
        setInputValue('');
      }
    };
    const onCancle = () => {
      setInputValue('');
    };

    e.preventDefault();
    setWidgetState({ option: '' });
    showConfirmModal({ title, onConfirm, onCancle });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className={`${styles.submitForm} ${styles.category}`} onSubmit={handleSubmit}>
      <div className={styles.sortModal}>
        {/* 제목 */}
        <TitleBox>분류 추가</TitleBox>

        {/* 입력 */}
        <SubmitInfoBox>
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
        </SubmitInfoBox>

        {/* 제출 */}
        <SubmitButton value='추가하기' />
      </div>
    </form>
  );
}
