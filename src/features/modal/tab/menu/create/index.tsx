import { ChangeEvent, useId } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import validate from '@/utils/function/validate';
import { createImgPath } from '@/utils/function/image-path';

import { initMenu, menuAtom, menuImageAtom, setMenuImageAtom } from '@/components/ui/menu/store/atom';

import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { addMenu } from '@/lib/supabase/tables/menu';
import { uploadImage } from '@/lib/supabase/storage/store';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { openSubmissionAlertAtom } from '@/features/alert/popup/store/atom';

import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';
import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';

import { setModalClickAtom } from '../../store/atom';
import styles from './../index.module.css';
import { buildMenuData } from '@/utils/function/set-menu';

export default function CreateMenuModal() {
  const [inputValue, setInputValue] = useAtom(menuAtom);
  const menuImage = useAtomValue(menuImageAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const openSubmissionAlert = useSetAtom(openSubmissionAlertAtom);
  const setMenuImage = useSetAtom(setMenuImageAtom);
  const { showConfirmModal } = useConfirmModal();
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const _fileId = useId();
  const fileId = menuImage ? _fileId : '';

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = '메뉴를 추가하겠습니까?';
    const onConfirm = async () => {
      // 이미지 스토리지 삽입
      try {
        if (menuImage) {
          await uploadImage({ file: menuImage, fileId });
        }
      } catch (err) {
        console.error(e);
        openSubmissionAlert('오류가 발생했습니다');
        return;
      }

      // 메뉴 데이터 가공
      const menuCategories = menuCategoriesQuery.data;
      const menuData = buildMenuData({ fileId, inputValue, menuCategories });

      // 메뉴 데이터 검증
      const valid = await validate.createMenuValue(menuData);
      if (!valid.success) {
        const message = valid.error.issues[0].message;
        alert(message);
        return;
      }

      // 메뉴 데이터 발신
      try {
        await addMenu(menuData); // 메뉴 삽입
        await menuListQuery.refetch(); // 메뉴 리패치
        openSubmissionAlert('추가되었습니다.'); // 데이터 처리 상태 알림
        setModalClick(false);
        setInputValue(initMenu); // 초기화
      } catch (e) {
        console.error(e);
        openSubmissionAlert('오류가 발생했습니다');
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

  /** 이미지 파일 설정 */
  const setImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setMenuImage(file[0]);
    }
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

        <label className={styles.imgInput} htmlFor='img_url'>
          <span className={styles.inputTitle}>사진 첨부</span>

          <div className={styles.imgBox}>
            <div className={styles.iconBox}>
              <img src={LIGHT_PICTURE_ICON} alt='사진 아이콘' />
            </div>

            <span>사진을 첨부해주세요</span>
          </div>

          <input
            type='file'
            id='img_url'
            name='img_url'
            hidden
            onChange={setImgFile}
            accept='image/png, image/jpeg, image/webp'
          />
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

            <div className={styles.priceBox}>
              <input
                type='number'
                step={10}
                id='price'
                name='price'
                placeholder='가격을 입력해주세요.'
                onChange={getInputValue}
                value={inputValue.price}
              />
              <span>원</span>
            </div>
          </label>

          <label className={styles.inputWrapper} htmlFor='status'>
            <span className={styles.inputTitle}>판매 상태</span>

            <select className={styles.options} id='status' name='tag' onChange={getInputValue} value={inputValue.tag}>
              <option value={'기본'}>기본</option>
              <option value={'신규'}>신규</option>
              <option value={'인기'}>인기</option>
              <option value={'품절'}>품절</option>
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
