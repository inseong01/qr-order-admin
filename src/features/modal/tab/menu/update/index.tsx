import { ChangeEvent, FormEvent } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import validate from '@/utils/function/validate';

import { initMenu, menuAtom } from '@/components/ui/menu/store/atom';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';

import { MENU_CATEGORIES_QUERY_KEY } from '@/hooks/use-query/query-client';

import { MenuCategory } from '@/lib/supabase/function/menu-category';
import { deleteMenu, updateMenu } from '@/lib/supabase/function/menu';

import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';
import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';

import { tabModalAtom } from '../../store/atom';
import styles from './../index.module.css';

export default function UpdateMenuModal() {
  const [inputValue, setInputValue] = useAtom(menuAtom);
  const setModal = useSetAtom(tabModalAtom);
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);
  const { showConfirmModal } = useConfirmModal();

  const categories = useQuery<MenuCategory[]>({ queryKey: MENU_CATEGORIES_QUERY_KEY });

  /* 비즈니스 로직 */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.name;
    const title = submitType === 'update' ? '메뉴를 수정하겠습니까?' : '메뉴를 삭제하겠습니끼?';
    const onConfirm = async () => {
      const menuData = {
        id: inputValue.id,
        img_url: inputValue.img_url,
        category_id: categories.data?.find((c) => c.title === inputValue.menu_category.title)?.id,
        name: inputValue.name,
        price: Number(inputValue.price),
        tag: inputValue.tag,
      };

      const valid = await validate.updateMenuValue(menuData); // 값 검증

      if (!valid.success) {
        const message = valid.error.issues[0].message;
        alert(message);
        return;
      }

      try {
        submitType === 'update' ? await updateMenu(menuData.id, menuData) : await deleteMenu(menuData.id);
        openSubmissionStatusAlert(submitType === 'update' ? '수정되었습니다' : '삭제되었습니다.'); // 데이터 처리 상태 알림
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
    setModal(null);
    setInputValue(initMenu);
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
