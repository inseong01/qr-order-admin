import styles from '@/style/modal/menu/InsertCategory.module.css';
import { OnChangeInputValueEvent, OnSubmitDataEvent } from '../../../lib/hook/useModalSubmitData';
import { ModalType } from '../../../lib/store/useModalSlice';
import TypeCategoryInfo from './TypeCategoryInfo';

export default function InsertCategory({
  type,
  onSubmitData,
  onChangeInputValue,
}: {
  type: ModalType;
  onSubmitData: (e: OnSubmitDataEvent) => Promise<void>;
  onChangeInputValue: (e: OnChangeInputValueEvent) => void;
}) {
  return (
    <form className={`${styles.submitForm} ${styles.category}`} onSubmit={onSubmitData}>
      <div className={`${styles.sortModal}`}>
        <div className={styles.title}>분류명</div>
        <ul className={styles.submitInfo}>
          <TypeCategoryInfo type={type} onChangeInputValue={onChangeInputValue} />
        </ul>

        <div className={styles.submitBtn}>
          <input
            type="submit"
            className={styles.btn}
            value={type === 'insert' ? '추가하기' : '수정하기'}
            name={type === 'insert' ? 'insert' : 'upsert'}
          />
        </div>
      </div>
    </form>
  );
}
