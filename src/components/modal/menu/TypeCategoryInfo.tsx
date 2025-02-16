import styles from '@/style/modal/menu/InsertCategory.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { ModalType } from '../../../lib/store/useModalSlice';
import { OnChangeInputValueEvent } from '../../../lib/hook/useModalSubmitData';
import { MenuCategoryList } from '../../../types/common';

export default function TypeCategoryInfo({
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
            type="text"
            className={styles.input}
            name="title"
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
              type="text"
              className={styles.input}
              name="title"
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
