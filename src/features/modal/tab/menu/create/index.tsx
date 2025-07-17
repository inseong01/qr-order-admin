import { ChangeEvent, useState } from 'react';
import { useSetAtom } from 'jotai';

import { useQuery } from '@tanstack/react-query';

import { MenuCategory } from '@/lib/supabase/function/menu-category';
import { MENU_CATEGORIES_QUERY_KEY } from '@/hooks/use-query/query-client';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';

import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';
import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';

import { tabModalAtom } from '../../store/atom';
import styles from './../index.module.css';

const initInputValue = {
  name: '',
  price: 0,
  tag: '신규',
  img_url: '',
  menu_category: {
    title: '',
  },
};

export default function CreateMenuModal() {
  const setModal = useSetAtom(tabModalAtom);
  const { showConfirmModal } = useConfirmModal();
  const [inputValue, setInputValue] = useState(initInputValue);

  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = '메뉴를 추가하겠습니까?';
    const onConfirm = () => {
      // TODO: 실제 제출 로직 구현 (예: API 호출)
      // create: supabase menu 테이블로 값 전달 (id는 자동할당)
      // inputValue 값 점검 완료
    };

    // 초기화 로직 추가
    showConfirmModal({ title, onConfirm });
  };

  const getInputValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue((prev) => {
      if (name === 'title') {
        return {
          ...prev,
          menu_category: { title: value },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleClose = () => {
    setModal(null);
  };

  return (
    <form className={styles.addMenuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          {/* 제목 */}
          <h2 className={styles.modalTitle}>음식 추가</h2>

          {/* 닫기 */}
          <button type='button' className={styles.close} onClick={handleClose}>
            <img src={LIGHT_PLUS_ICON} alt='close icon' />
          </button>
        </div>

        <label className={styles.imgInput} htmlFor='thumbnail'>
          <button type='button' className={styles.iconBox} onClick={handleClose}>
            <img src={LIGHT_PICTURE_ICON} alt='img input icon' />
          </button>

          <span>사진 첨부</span>

          <input type='file' id='thumbnail' hidden />
        </label>

        <div className={styles.main}>
          <label className={styles.inputWrapper} htmlFor='foodName'>
            <span className={styles.inputTitle}>음식명</span>

            <input
              type='text'
              id='foodName'
              placeholder='음식명을 입력해주세요.'
              name='name'
              onChange={getInputValue}
              value={inputValue.name}
            />
          </label>

          <label className={styles.inputWrapper} htmlFor='category'>
            <span className={styles.inputTitle}>분류</span>

            <select
              className={styles.options}
              id='category'
              defaultValue={'default'}
              name='title'
              onChange={getInputValue}
            >
              {/* 기본 옵션 */}
              <option key={'default'} value={'default'} disabled>
                선택해주세요
              </option>

              {/* 옵션 */}
              {categories.data?.map(({ id, title }) => {
                return (
                  <option key={id} value={title}>
                    {title}
                  </option>
                );
              })}
            </select>
          </label>

          <label className={styles.inputWrapper} htmlFor='price'>
            <span className={styles.inputTitle}>가격</span>

            <input
              type='text'
              id='price'
              name='price'
              placeholder='가격을 입력해주세요.'
              onChange={getInputValue}
              value={inputValue.price}
            />
          </label>

          <label className={styles.inputWrapper} htmlFor='status'>
            <span className={styles.inputTitle}>판매 상태</span>

            <select className={styles.options} id='status' name='tag' onChange={getInputValue} value={inputValue.tag}>
              <option>신규</option>
              <option>인기</option>
              <option>품절</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.submitBox}>
        <button type='submit' className={styles.submit} style={{ backgroundColor: '#4caff8' }}>
          추가하기
        </button>
      </div>
    </form>
  );
}
