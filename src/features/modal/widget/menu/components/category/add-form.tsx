import { useAtom, useSetAtom } from 'jotai';

import { useQueryMenuCategoryList } from '@/hooks/use-query/query';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { setWidgetAtomState } from '@/features/widget/store/atom';

import { addMenuCategory } from '@/lib/supabase/tables/menu-category';
import validate from '@/utils/function/validate';

import { useConfirmModal } from '../../../../confirm/hook/use-confirm-modal';
import SubmitButton from '../button/button';
import { SubmitFormBox, SubmitInfoBox, TitleBox } from '../common';
import { categoryInputAtom } from '../../store/atom';
import styles from './add-form.module.css';

/**
 * 새로운 메뉴 분류를 추가하는 컴포넌트
 */
export default function AddCategoryForm() {
  const [inputValue, setInputValue] = useAtom(categoryInputAtom);
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const showToast = useSetAtom(showToastAtom);
  const { showConfirmModal } = useConfirmModal();

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const title = '새로운 분류를 추가하겠습니까?';
    const onConfirm = async () => {
      // 값 검증
      const { success, data, error } = await validate.createCategoryValue(inputValue);
      if (!success) {
        const message = error?.issues[0].message;
        showToast(message);
        // setInputValue('');
        setWidgetState({ option: 'create-menu-category' });
        return;
      }

      // supabase 전달
      try {
        await addMenuCategory({ title: data });
        await menuCategoriesQuery.refetch();
      } catch (e) {
        console.error(e);
        showToast('오류가 발생했습니다.');
        return;
      }

      // 데이터 처리 상태 알림
      showToast('추가되었습니다.');

      // 초기화
      setInputValue('');
    };
    const onCancle = () => {
      setWidgetState({ option: 'create-menu-category' });
    };

    e.preventDefault();
    setWidgetState({ option: '' });
    showConfirmModal({ title, onConfirm, onCancle });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <SubmitFormBox onSubmit={handleSubmit}>
      {/* 제목 */}
      <TitleBox>분류 추가</TitleBox>

      {/* 입력 */}
      <SubmitInfoBox>
        <li className={`${styles.category} ${styles.info}`}>
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
    </SubmitFormBox>
  );
}
