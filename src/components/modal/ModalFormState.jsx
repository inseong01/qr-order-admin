'use client';

import styles from '@/style/modal/ModalFormState.module.css';
import { changeModalState } from '@/lib/features/modalState/modalSlice';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSubmitState,
  changeSubmitType,
  fetchFormData,
  resetSubmitState,
} from '@/lib/features/submitState/submitSlice';

export default function ModalFormState({ categoryList }) {
  // useSelector
  const type = useSelector((state) => state.modalState.type); // 기본: ''
  const tab = useSelector((state) => state.tabState.state);
  const categoryTitle = useSelector((state) => state.categoryState.title);
  const item = useSelector((state) => state.itemState.item);
  const submitStatus = useSelector((state) => state.submitState.status);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // dispatch
  const dispatch = useDispatch();
  // useState
  const [value, setValue] = useState({});

  // input value 업데이트
  useEffect(() => {
    setValue(item);
  }, [item]);

  // 제출 완료 되면 모달 닫기
  useEffect(() => {
    if (submitStatus === 'fulfilled') {
      dispatch(changeModalState({ isOpen: false }));
      dispatch(resetSubmitState());
    }
  }, [submitStatus]);

  function onChangeInputValue(type) {
    return (e) => {
      const target = e.target.name;
      if (type === 'category') {
        setValue(() => ({ [target]: e.target.value }));
      } else {
        setValue((prev) => {
          return {
            ...prev,
            [target]: e.target.value,
          };
        });
      }
    };
  }

  function onSubmitData(table) {
    return (e) => {
      const method = e.nativeEvent.submitter.name;
      e.preventDefault();
      if (isSubmit) return;
      dispatch(changeSubmitType({ table }));
      dispatch(fetchFormData({ method, itemInfo: value, table }));
    };
  }

  switch (tab) {
    case 'menu': {
      return (
        <>
          {type !== 'category' ? (
            <form className={styles.submitForm} onSubmit={onSubmitData('menu')}>
              <input type="file" id="fileInput" className={styles.fileInput} hidden />
              <label htmlFor="fileInput" className={styles.left}>
                <div className={styles.iconBox}>
                  <Image src={'/img/add-icon.png'} alt="사진 추가" width={25} height={25} />
                </div>
                <div className={styles.title}>{type === 'add' ? '사진 추가' : '사진 변경'}</div>
              </label>
              <div className={styles.right}>
                <div className={styles.title}>{type === 'add' ? '새로운 메뉴' : '현재 메뉴'}</div>
                <ul className={styles.submitInfo}>
                  <li className={styles.info}>
                    <label htmlFor="nameInput" className={styles.title}>
                      상품명
                    </label>
                    <input
                      required
                      type="text"
                      id="nameInput"
                      className={styles.input}
                      value={item.name}
                      name="name"
                      onChange={onChangeInputValue('')}
                    />
                  </li>
                  <li className={styles.info}>
                    <label htmlFor="priceInput" className={styles.title}>
                      금액
                    </label>
                    <input
                      required
                      type="number"
                      id="priceInput"
                      step={10}
                      min={10}
                      className={styles.input}
                      value={item.price === 0 ? '' : item.price}
                      name="price"
                      onChange={onChangeInputValue('')}
                    />
                  </li>
                  <li className={styles.info}>
                    <label htmlFor="sortSelect" className={styles.title}>
                      분류
                    </label>
                    <select
                      id="sortSelect"
                      className={styles.input}
                      name="sort"
                      onChange={onChangeInputValue('')}
                      defaultValue={
                        !categoryTitle || categoryTitle === '전체메뉴' ? item.sort : categoryTitle
                      }
                    >
                      {categoryList.data.map((category) => {
                        return (
                          <option key={category.key} value={category.sort}>
                            {category.title}
                          </option>
                        );
                      })}
                    </select>
                  </li>
                </ul>
                <div className={styles.submitBtn}>
                  {type !== 'add' && (
                    <input
                      type="submit"
                      className={`${styles.btn} ${styles.delete}`}
                      value={'삭제하기'}
                      name="delete"
                    />
                  )}
                  <input
                    type="submit"
                    className={styles.btn}
                    value={type === 'add' ? '추가하기' : '수정하기'}
                    name={type === 'add' ? 'insert' : 'update'}
                  />
                </div>
              </div>
            </form>
          ) : (
            <form
              className={`${styles.submitForm} ${styles.category}`}
              onSubmit={onSubmitData('category-menu')}
            >
              <div className={`${styles.sortModal} ${styles.right}`}>
                <div className={styles.title}>분류명</div>
                <ul className={styles.submitInfo}>
                  <li className={styles.info}>
                    <input
                      required
                      type="text"
                      className={styles.input}
                      name="title"
                      onChange={onChangeInputValue('category')}
                      placeholder="분류명을 입력해주세요"
                    />
                  </li>
                </ul>
                <div className={styles.submitBtn}>
                  <input type="submit" className={styles.btn} value={'추가하기'} name={'insert'} />
                </div>
              </div>
            </form>
          )}
        </>
      );
    }
    case 'table': {
      return (
        <form className={styles.submitForm} onSubmit={onSubmitData}>
          <div className={styles.right}>
            <div className={styles.title}>{type === 'add' ? '새로운 메뉴' : '현재 메뉴'}</div>
            <ul className={styles.submitInfo}>
              <li className={styles.info}>
                <label htmlFor="nameInput" className={styles.title}>
                  상품명
                </label>
                <input
                  required
                  type="text"
                  id="nameInput"
                  className={styles.input}
                  value={value.name}
                  name="name"
                  onChange={onChangeInputValue}
                />
              </li>
              <li className={styles.info}>
                <label htmlFor="priceInput" className={styles.title}>
                  금액
                </label>
                <input
                  required
                  type="number"
                  id="priceInput"
                  step={10}
                  min={10}
                  className={styles.input}
                  value={value.price === 0 ? '' : value.price}
                  name="price"
                  onChange={onChangeInputValue}
                />
              </li>
              <li className={styles.info}>
                <label htmlFor="sortSelect" className={styles.title}>
                  분류
                </label>
                <select
                  id="sortSelect"
                  className={styles.input}
                  value={value.sort}
                  name="sort"
                  onChange={onChangeInputValue}
                >
                  {categoryList.data.map((category) => {
                    return (
                      <option key={category.key} value={category.sort}>
                        {category.title}
                      </option>
                    );
                  })}
                </select>
              </li>
            </ul>
            <div className={styles.submitBtn}>
              {type !== 'add' && (
                <input
                  type="submit"
                  className={`${styles.btn} ${styles.delete}`}
                  value={'삭제하기'}
                  name="delete"
                />
              )}
              <input
                type="submit"
                className={styles.btn}
                value={type === 'add' ? '추가하기' : '수정하기'}
                name={type === 'add' ? 'insert' : 'update'}
              />
            </div>
          </div>
        </form>
      );
    }
  }
}
