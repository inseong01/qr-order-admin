import { ChangeEvent, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import { OnChangeInputValueEvent, OnSubmitDataEvent } from '../../hook/use-modal-submit-data';

import { MenuCategoryList, MenuList } from '../../../../types/common';

import styles from './menu-index.module.css';

export default function CreateOrEditMenuItem({
  onSubmitData,
  onChangeInputValue,
  categoryList,
  value,
}: {
  onSubmitData: (e: OnSubmitDataEvent) => Promise<void>;
  onChangeInputValue: (e: OnChangeInputValueEvent) => void;
  categoryList: MenuCategoryList[] | [];
  value: MenuList;
}) {
  const categoryId = useBoundStore((state) => state.category.id);
  const modalType = useBoundStore((state) => state.modal.type);

  const imgBox = useRef<HTMLImageElement>(null);

  const [isPrevImg, setPrevImg] = useState(false);

  function onChangeShowPrevImage(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    setPrevImg(true);

    reader.onload = ({ target }) => {
      if (imgBox.current && target) {
        imgBox.current.src = target.result as string;
      }
    };

    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <form className={styles.submitForm} onSubmit={onSubmitData}>
      {/* 카테고리명 */}
      <div className={styles.title}>{modalType === 'insert' ? '새로운 메뉴' : '현재 메뉴'}</div>

      {/* 옵션 목록 */}
      <div className={styles.options}>
        <input
          type='file'
          id='fileInput'
          className={styles.fileInput}
          name='url'
          accept='.png, .jpg'
          onChange={onChangeShowPrevImage}
          hidden
        />

        {/* 사진 */}
        <label htmlFor='fileInput' className={styles.left}>
          {!isPrevImg ? (
            <>
              <div className={styles.iconBox}>
                <FontAwesomeIcon icon={faPlus} size='1x' />
              </div>
              <div className={styles.title}>{modalType === 'insert' ? '사진 추가' : '사진 변경'}</div>
            </>
          ) : (
            <div className={styles.prevImgBox}>
              <img ref={imgBox} alt='미리보기' />
            </div>
          )}
        </label>

        <div className={styles.right}>
          <ul className={styles.submitInfo}>
            {/* 상품명 입력 */}
            <li className={styles.info}>
              <label htmlFor='nameInput' className={styles.title}>
                상품명
              </label>
              <input
                required
                type='text'
                id='nameInput'
                className={styles.input}
                value={value.name}
                name='name'
                onChange={onChangeInputValue}
                placeholder='음식 이름을 입력해주세요'
              />
            </li>

            {/* 금액 입력 */}
            <li className={styles.info}>
              <label htmlFor='priceInput' className={styles.title}>
                금액
              </label>
              <input
                required
                type='number'
                id='priceInput'
                step={10}
                min={10}
                className={styles.input}
                value={value.price === 0 ? 0 : value.price}
                name='price'
                onChange={onChangeInputValue}
              />
            </li>

            {/* 분류 선택 */}
            <li className={styles.info}>
              <label htmlFor='sortSelect' className={styles.title}>
                분류
              </label>

              <select
                required
                id='sortSelect'
                className={styles.input}
                name='sortId'
                onChange={onChangeInputValue}
                defaultValue={value.sortId ? value.sortId : categoryId === 0 ? '' : categoryId}
              >
                <option value={''} disabled>
                  분류를 선택해주세요
                </option>

                {categoryList?.map((category) => {
                  // 카테고리, 0: 전체메뉴
                  return (
                    category.id !== 0 && (
                      <option key={category.id} value={category.id} disabled={category.id === 0}>
                        {category.title}
                      </option>
                    )
                  );
                })}
              </select>
            </li>
          </ul>

          {/* 제출 버튼 */}
          <div className={styles.submitBtn}>
            {modalType !== 'insert' && (
              <input type='submit' className={`${styles.btn} ${styles.delete}`} value={'삭제하기'} name='delete' />
            )}
            <input
              type='submit'
              className={styles.btn}
              value={modalType === 'insert' ? '추가하기' : '수정하기'}
              name={modalType === 'insert' ? 'insert' : 'update'}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
