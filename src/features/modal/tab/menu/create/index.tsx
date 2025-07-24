import { ChangeEvent } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import validate from '@/utils/function/validate';

import { initMenu, menuAtom } from '@/components/ui/menu/store/atom';

import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { addMenu } from '@/lib/supabase/tables/menu';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';

import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';
import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';

import { setModalClickAtom } from '../../store/atom';
import styles from './../index.module.css';

export default function CreateMenuModal() {
  const [inputValue, setInputValue] = useAtom(menuAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);
  const { showConfirmModal } = useConfirmModal();
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = '메뉴를 추가하겠습니까?';
    const onConfirm = async () => {
      const menuData = {
        img_url: inputValue.img_url,
        category_id: menuCategoriesQuery.data?.find((c) => c.title === inputValue.menu_category.title)?.id,
        name: inputValue.name,
        price: Number(inputValue.price),
        tag: inputValue.tag,
      };

      const valid = await validate.createMenuValue(menuData); // 값 검증

      if (!valid.success) {
        const message = valid.error.issues[0].message;
        alert(message);
        return;
      }

      try {
        await addMenu(menuData);
        await menuListQuery.refetch(); // 메뉴 리패치
        openSubmissionStatusAlert('추가되었습니다.'); // 데이터 처리 상태 알림
        setModalClick(false);
        setInputValue(initMenu); // 초기화
      } catch (e) {
        console.error(e);
        openSubmissionStatusAlert('오류가 발생했습니다');
      }
    };

    showConfirmModal({ title, onConfirm });
  };

  /** 입력값 수신 */
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

  /** 폼 창 닫기 */
  const handleClose = () => {
    setModalClick(false);
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
              name='title'
              onChange={getInputValue}
              value={inputValue.menu_category.title}
            >
              {/* 기본 옵션 */}
              <option key={'default'} disabled>
                선택해주세요
              </option>

              {/* 옵션 */}
              {menuCategoriesQuery.data?.map(({ id, title }) => {
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
              type='number'
              step={10}
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
