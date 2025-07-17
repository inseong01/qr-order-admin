import { ChangeEvent, FormEvent, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { useQuery } from '@tanstack/react-query';

import { clearSelectedMenuAtom, menuAtom } from '@/components/ui/menu/store/atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { MENU_CATEGORIES_QUERY_KEY } from '@/hooks/use-query/query-client';
import { MenuCategory } from '@/lib/supabase/function/menu-category';

import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';
import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';

import { tabModalAtom } from '../../store/atom';
import styles from './../index.module.css';

export default function UpdateMenuModal() {
  const menu = useAtomValue(menuAtom);
  const clearSelectedMenu = useSetAtom(clearSelectedMenuAtom);
  const setModal = useSetAtom(tabModalAtom);
  const { showConfirmModal } = useConfirmModal();
  const [inputValue, setInputValue] = useState(menu!);

  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });

  /* 비즈니스 로직 */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 데이터 선별 로직

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.name;
    const title = submitType === 'update' ? '메뉴를 수정하겠습니까?' : '메뉴를 삭제하겠습니끼?';
    const onConfirm = () => {
      // TODO: 실제 제출 로직 구현 (예: API 호출)
      // delete, upsert: supabase menu 테이블로 값 전달 (id 또는 수정된 정보)
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
    clearSelectedMenu();
  };

  return (
    <form className={styles.addMenuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          {/* 제목 */}
          <h2 className={styles.modalTitle}>음식 수정</h2>

          {/* 닫기 */}
          <button type='button' className={styles.close} onClick={handleClose}>
            <img src={LIGHT_PLUS_ICON} alt='close icon' />
          </button>
        </div>

        <label className={styles.imgInput} htmlFor='thumbnail'>
          <button type='button' className={styles.iconBox} onClick={() => {}}>
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
              name='name'
              onChange={getInputValue}
              value={inputValue.name}
              placeholder='음식명을 입력해주세요.'
            />
          </label>

          <label className={styles.inputWrapper} htmlFor='category'>
            <span className={styles.inputTitle}>분류</span>

            <select
              className={styles.options}
              id='category'
              name='title'
              onChange={getInputValue}
              value={inputValue.menu_category.title}
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
              <option value={'신규'}>신규</option>
              <option value={'인기'}>인기</option>
              <option value={'품절'}>품절</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.submitBox}>
        <button type='submit' name='delete' className={styles.submit} style={{ backgroundColor: '#da2b2e' }}>
          삭제하기
        </button>
        <button type='submit' name='update' className={styles.submit} style={{ backgroundColor: '#4caff8' }}>
          수정하기
        </button>
      </div>
    </form>
  );
}
