import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { useMutationAddMenuCategory } from '@/hooks/use-query/menu-category/query';

import { setWidgetAtomState } from '@/features/widget/store/atom';

import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import validate from '@/util/function/validate';

import { useConfirmModal } from '../../../../confirm/hook/use-confirm-modal';
import { categoryErrorAtom, categoryInputAtom, setCategoryErrorAtom } from '../../store/atom';
import { SubmitFormBox, SubmitInfoBox, TitleBox } from '../common';
import SubmitButton from '../button/button';
import styles from './add-form.module.css';

/**
 * 새로운 메뉴 분류를 추가하는 컴포넌트
 */
export default function AddCategoryForm() {
  const [inputValue, setInputValue] = useAtom(categoryInputAtom);
  const categoryError = useAtomValue(categoryErrorAtom);
  const setWidgetState = useSetAtom(setWidgetAtomState);
  const setCategoryError = useSetAtom(setCategoryErrorAtom);

  const { showConfirmModal } = useConfirmModal();
  const mutationAddMenuCategory = useMutationAddMenuCategory();

  /* 비즈니스 로직 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const title = '새로운 분류를 추가하겠습니까?';

    // 값 검증
    const { success, data, error } = await validate.createCategoryValue(inputValue);
    if (!success) {
      const message = error?.issues[0].message;
      setCategoryError(message);
      return e.preventDefault();
    }

    const onConfirm = async () => {
      mutationAddMenuCategory.mutate({ title: data });
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
    setInputValue(e.target.value.trim());
    setCategoryError('');
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

      <FormInputBox>
        {/* 오류 메시지 */}
        <FormInputCaption hasError={Boolean(categoryError)} text={categoryError} align='center' />

        {/* 제출 */}
        <SubmitButton value='추가하기' />
      </FormInputBox>
    </SubmitFormBox>
  );
}
