import { ModalType } from '../../../../../lib/store/slices/modal-slice';
import { useBoundStore } from '../../../../../lib/store/use-bound-store';

import { MenuCategoryList } from '../../../../../types/common';

import { OnChangeInputValueEvent, OnSubmitDataEvent } from '../../../../features/modal/hook/use-modal-submit-data';

import styles from './category-index.module.css';

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
            type='submit'
            className={styles.btn}
            value={type === 'insert' ? '추가하기' : '수정하기'}
            name={type === 'insert' ? 'insert' : 'upsert'}
          />
        </div>
      </div>
    </form>
  );
}

function TypeCategoryInfo({
  type,
  onChangeInputValue,
}: {
  type: ModalType;
  onChangeInputValue: (e: OnChangeInputValueEvent) => void;
}) {
  const selectedList = useBoundStore((state) => state.itemBox.list) as MenuCategoryList[];

  switch (type) {
    case 'insert': {
      return (
        <li className={styles.info}>
          <input
            required
            type='text'
            className={styles.input}
            name='title'
            onChange={onChangeInputValue}
            placeholder={'분류명을 입력해주세요'}
          />
        </li>
      );
    }
    case 'update': {
      return selectedList.map((list, idx) => {
        return (
          <li key={idx} className={styles.info}>
            <div className={styles.subtitle} title={list.title}>
              {list.title}
            </div>
            <input
              required
              type='text'
              className={styles.input}
              name='title'
              onChange={onChangeInputValue}
              placeholder={'분류명을 입력해주세요'}
              data-id={list.id}
            />
          </li>
        );
      });
    }
  }
}
