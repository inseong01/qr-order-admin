import { ChangeEvent, FormEvent, useId } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import validate from '@/utils/function/validate';

import {
  initMenu,
  menuAtom,
  menuImageAtom,
  resetMenuImageAtom,
  setMenuImageAtom,
} from '@/components/ui/menu/store/atom';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { openSubmissionAlertAtom } from '@/features/alert/popup/store/atom';

import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { deleteMenu, updateMenu } from '@/lib/supabase/tables/menu';
import { deleteImageByFileName, updateImage } from '@/lib/supabase/storage/store';

import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';

import { setModalClickAtom } from '../../store/atom';
import styles from './../index.module.css';
import { updateMenuData } from '@/utils/function/set-menu';

export default function UpdateMenuModal() {
  const [inputValue, setInputValue] = useAtom(menuAtom);
  const menuImage = useAtomValue(menuImageAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const openSubmissionAlert = useSetAtom(openSubmissionAlertAtom);
  const setMenuImage = useSetAtom(setMenuImageAtom);
  const resetMenuImage = useSetAtom(resetMenuImageAtom);
  const { showConfirmModal } = useConfirmModal();
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const fileId = inputValue.img_url.split('menu_').at(-1);
  console.log(inputValue);
  /* 비즈니스 로직 */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.name;
    const title = submitType === 'update' ? '메뉴를 수정하겠습니까?' : '메뉴를 삭제하겠습니끼?';
    const onConfirm = async () => {
      // 이미지 스토리지 업데이트
      try {
        if (!fileId) {
          alert('다시 시도해주세요.');
          return;
        }
        if (menuImage) {
          console.log(menuImage, fileId, submitType);
          await updateImage({ file: menuImage, fileId });
        } else {
          console.log(fileId, submitType);
          await deleteImageByFileName({ fileId });
        }
      } catch (err) {
        console.error(e);
        openSubmissionAlert('오류가 발생했습니다');
        return;
      } finally {
        setModalClick(false);
        setInputValue(initMenu); // 초기화
        resetMenuImage();
      }

      // 메뉴 데이터 가공
      const hasImg = !!menuImage;
      const menuCategories = menuCategoriesQuery.data;
      const menuData = updateMenuData({ fileId, inputValue, menuCategories, hasImg });

      // 값 검증
      const valid = await validate.updateMenuValue(menuData);
      if (!valid.success) {
        const message = valid.error.issues[0].message;
        alert(message);
        return;
      }

      try {
        submitType === 'update' ? await updateMenu(menuData.id, menuData) : await deleteMenu(menuData.id);
        await menuListQuery.refetch();
        openSubmissionAlert(submitType === 'update' ? '수정되었습니다' : '삭제되었습니다.'); // 데이터 처리 상태 알림
      } catch (e) {
        console.error(e);
        openSubmissionAlert('오류가 발생했습니다');
      } finally {
        setModalClick(false);
        setInputValue(initMenu); // 초기화
        resetMenuImage();
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
    setInputValue(initMenu);
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
          <h2 className={styles.modalTitle}>음식 수정</h2>

          {/* 닫기 */}
          <button type='button' className={styles.close} onClick={handleClose}>
            <img src={LIGHT_PLUS_ICON} alt='close icon' />
          </button>
        </div>

        <label className={styles.imgInput} htmlFor='img_url'>
          <span className={styles.inputTitle}>사진 변경</span>

          <div className={styles.imgBox}>
            <img src={inputValue.img_url} alt='음식 섬네일' />
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
