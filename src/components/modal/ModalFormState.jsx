'use client';

import styles from '@/style/modal/ModalFormState.module.css';
import { changeModalState, resetModalState } from '@/lib/features/modalState/modalSlice';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSubmitMsgType, fetchFormData, resetSubmitState } from '@/lib/features/submitState/submitSlice';

export default function ModalFormState({ categoryList }) {
  // useSelector
  const modalType = useSelector((state) => state.modalState.type); // 기본: '', 'add'/'edit'/'category'
  const tab = useSelector((state) => state.tabState.state);
  const item = useSelector((state) => state.itemState.item);
  const submitStatus = useSelector((state) => state.submitState.status);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const categoryTitle = useSelector((state) => state.categoryState.title);
  // dispatch
  const dispatch = useDispatch();
  // useState
  const [value, setValue] = useState(item);

  // input value 업데이트
  useEffect(() => {
    setValue(item);
  }, [item]);

  // 제출 완료 되면 모달 닫기
  useEffect(() => {
    if (tab === 'menu' && isSubmit && submitStatus === 'fulfilled') {
      dispatch(changeModalState({ isOpen: false }));
      // dispatch(resetSubmitState()); // alertMsg 나오지 않았던 원인
    }
  }, [submitStatus]);

  function onChangeInputValue(onChangeType) {
    return (e) => {
      const target = e.target.name;
      if (onChangeType === 'category') {
        setValue((prev) => (prev = { [target]: e.target.value }));
      } else if (onChangeType === 'add/edit') {
        setValue((prev) => ({
          ...prev,
          [target]: e.target.value,
        }));
      } else {
        console.log('No input value', 'onChangeType: ', onChangeType);
      }
    };
  }

  function onSubmitData(table) {
    return (e) => {
      const method = e.nativeEvent.submitter.name;
      e.preventDefault();
      if (isSubmit) return;
      dispatch(changeSubmitMsgType({ msgType: modalType.split('-')[0] }));
      switch (modalType) {
        case 'delete-category': {
          const checkedInputArr = Array.from(e.target.elements.check).filter(
            (inputList) => inputList?.checked
          );
          if (checkedInputArr.length <= 0) return alert('하나 이상은 선택해야 합니다');
          const deleteCategoryData = checkedInputArr.map((list) => list.dataset);
          dispatch(fetchFormData({ method, itemInfo: deleteCategoryData, table }));
          dispatch(changeModalState({ isOpen: false }));
          return;
        }
        default: {
          dispatch(fetchFormData({ method, itemInfo: [value], table }));
          dispatch(changeModalState({ isOpen: false }));
        }
      }
    };
  }

  if (tab === 'menu') {
    switch (modalType) {
      case 'add':
      case 'edit': {
        return (
          <form className={styles.submitForm} onSubmit={onSubmitData('menu')}>
            <input type="file" id="fileInput" className={styles.fileInput} hidden />
            <label htmlFor="fileInput" className={styles.left}>
              <div className={styles.iconBox}>
                <img src={'/img/add-icon.png'} alt="사진 추가" style={{ width: 25, height: 25 }} />
              </div>
              <div className={styles.title}>{modalType === 'add' ? '사진 추가' : '사진 변경'}</div>
            </label>
            <div className={styles.right}>
              <div className={styles.title}>{modalType === 'add' ? '새로운 메뉴' : '현재 메뉴'}</div>
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
                    onChange={onChangeInputValue('add/edit')}
                    placeholder="음식 이름을 입력해주세요"
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
                    value={value.price === 0 ? 0 : value.price}
                    name="price"
                    onChange={onChangeInputValue('add/edit')}
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
                    onChange={onChangeInputValue('add/edit')}
                    defaultValue={modalType === 'add' ? categoryTitle : value.sort}
                  >
                    {categoryList.data.map((category) => {
                      return (
                        <option key={category.id} value={category.sort}>
                          {category.title}
                        </option>
                      );
                    })}
                  </select>
                </li>
              </ul>
              <div className={styles.submitBtn}>
                {modalType !== 'add' && (
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
                  value={modalType === 'add' ? '추가하기' : '수정하기'}
                  name={modalType === 'add' ? 'insert' : 'update'}
                />
              </div>
            </div>
          </form>
        );
      }
      case 'add-category': {
        return (
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
        );
      }
      case 'delete-category': {
        return (
          <form
            className={`${styles.submitForm} ${styles.categoryDelete}`}
            onSubmit={onSubmitData('category-menu')}
          >
            <div className={`${styles.sortModal} ${styles.right}`}>
              <div className={styles.title}>분류 목록</div>
              <ul className={styles.submitInfo}>
                {categoryList.data.map((category, i) => {
                  return (
                    <li key={category.id} className={styles.list}>
                      <label htmlFor={`sortList${i}CheckBox`}>
                        <div className={styles.left}>{category.title}</div>
                      </label>
                      <input
                        type="checkbox"
                        name="check"
                        id={`sortList${i}CheckBox`}
                        className={styles.right}
                        data-title={category.title}
                        data-id={category.id}
                      />
                    </li>
                  );
                })}
              </ul>
              <div className={styles.submitBtn}>
                <input type="submit" className={styles.btn} value={'삭제하기'} name={'delete'} />
              </div>
            </div>
          </form>
        );
      }
    }
  } else if (tab === 'table') {
    return (
      <form className={styles.submitForm} onSubmit={onSubmitData}>
        <div className={styles.right}>
          <div className={styles.title}>{modalType === 'add' ? '새로운 메뉴' : '현재 메뉴'}</div>
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
                    <option key={category.id} value={category.sort}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </li>
          </ul>
          <div className={styles.submitBtn}>
            {modalType !== 'add' && (
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
              value={modalType === 'add' ? '추가하기' : '수정하기'}
              name={modalType === 'add' ? 'insert' : 'update'}
            />
          </div>
        </div>
      </form>
    );
  }
}
