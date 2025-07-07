import { MouseEvent } from 'react';

import { useBoundStore } from '../../../../../lib/store/use-bound-store';

import { MenuCategoryList } from '../../../../../types/common';

import { OnSubmitDataEvent } from '../../../../features/modal/hook/use-modal-submit-data';

import styles from './category-index.module.css';

export default function UpdateCategory({
  onSubmitData,
  categoryList,
}: {
  onSubmitData: (e: OnSubmitDataEvent) => Promise<void>;
  categoryList: MenuCategoryList[];
}) {
  const changeModalState = useBoundStore((state) => state.changeModalState);

  function onClickOpenModal(e: MouseEvent) {
    e.preventDefault();
    changeModalState({ type: 'insert-category', isOpen: true });
  }

  return (
    <form className={`${styles.submitForm}`} onSubmit={onSubmitData}>
      <div className={`${styles.sortModal}`}>
        {/* 제목 */}
        <div className={styles.title}>분류 목록</div>

        {/* 카테고리 목록 */}
        <ul className={styles.submitInfo}>
          {categoryList?.map((category) => {
            const { id, title } = category;

            return (
              <li key={id} className={styles.list}>
                {/* 카테고리명 */}
                <label htmlFor={`sortList${id}CheckBox`}>
                  <div className={styles.left}>{title}</div>
                </label>

                {/* 입력창 */}
                <input
                  type='checkbox'
                  name='check'
                  id={`sortList${id}CheckBox`}
                  className={styles.right}
                  data-title={title}
                  data-id={id}
                />
              </li>
            );
          })}
        </ul>

        {/* 제출 버튼 */}
        <div className={styles.submitBtn}>
          <input type='submit' className={`${styles.btn} ${styles.delete}`} value={'삭제하기'} name={'delete'} />
          <input type='submit' className={styles.btn} value={'수정하기'} name={'update'} />
          <input
            type='submit'
            className={`${styles.btn} ${styles.create}`}
            value={'추가하기'}
            name={'insert'}
            onClick={onClickOpenModal}
          />
        </div>
      </div>
    </form>
  );
}
