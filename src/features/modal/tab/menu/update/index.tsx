import { ChangeEvent, FormEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import validate from '@/utils/function/validate';

import {
  clearMenuErrorFormAtom,
  draftMenuAtom,
  initMenu,
  MenuFormInputs,
  menuImageFileAtom,
  resetMenuErrorAtom,
  resetMenuImageFileAtom,
  setMenuErrorAtom,
  setMenuImageFileAtom,
} from '@/components/ui/menu/store/atom';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { showToastAtom } from '@/features/alert/toast/store/atom';

import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { deleteMenu, updateMenu } from '@/lib/supabase/tables/menu';
import { deleteImageByFileName, STORE, updateImage } from '@/lib/supabase/storage/store';

import styles from './../index.module.css';
import { updateMenuData } from '../util/set-menu';
import { setModalClickAtom } from '../../store/atom';
import { MenuFormFields, MenuImageInput, MenuModalHeader } from '../components/common';

export default function UpdateMenuModal() {
  const [inputValue, setInputValue] = useAtom(draftMenuAtom);
  const menuImageFile = useAtomValue(menuImageFileAtom);
  const setMenuError = useSetAtom(setMenuErrorAtom);
  const resetMenuError = useSetAtom(resetMenuErrorAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const showToast = useSetAtom(showToastAtom);
  const setMenuImage = useSetAtom(setMenuImageFileAtom);
  const resetMenuImage = useSetAtom(resetMenuImageFileAtom);
  const { showConfirmModal } = useConfirmModal();
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();

  /* 비즈니스 로직 */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.name;
    const title = submitType === 'update' ? '메뉴를 수정하겠습니까?' : '메뉴를 삭제하겠습니끼?';

    // 메뉴 데이터 가공
    const hasImg = !!menuImageFile;
    const menuCategories = menuCategoriesQuery.data;
    const menuData = updateMenuData({ inputValue, menuCategories, hasImg });

    // 값 검증
    if (submitType === 'update') {
      const valid = await validate.updateMenuValue(menuData);
      if (!valid.success) {
        setMenuError(valid.error.issues);
        return e.preventDefault();
      }
    }

    // 제출
    const onConfirm = async () => {
      const fileId = inputValue.img_url.split('menu_').at(-1) ?? '';

      // 이미지 스토리지 업데이트
      try {
        if (submitType === 'update' && menuImageFile) {
          await updateImage({ file: menuImageFile, fileId });
        }

        if (submitType === 'delete' && fileId !== 'default') {
          const filePath = [STORE + `/menu_${fileId}`];
          await deleteImageByFileName({ filePath });
        }
      } catch (err) {
        console.error(e);
        showToast('이미지 처리 과정에서 오류가 발생했습니다.');
        return e.preventDefault();
      }

      // 메뉴 업데이트
      try {
        submitType === 'update' ? await updateMenu(menuData.id, menuData) : await deleteMenu(inputValue.id);
        await menuListQuery.refetch();
      } catch (err) {
        console.error(err);
        showToast('메뉴 처리 과정에서 오류가 발생했습니다.');
        return e.preventDefault();
      }

      // 데이터 처리 상태 알림
      showToast(submitType === 'update' ? '수정되었습니다.' : '삭제되었습니다.');

      // 초기화
      setModalClick(false);
      setInputValue(initMenu);
      resetMenuImage();
      resetMenuError();
    };

    showConfirmModal({ title, onConfirm });
  };

  const clearMenuErrorForm = useSetAtom(clearMenuErrorFormAtom);

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

    clearMenuErrorForm(name as keyof MenuFormInputs);
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
    <form className={styles.menuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        {/* 모달 주제 */}
        <MenuModalHeader title='메뉴 수정' onClose={handleClose} />

        {/* 사진 첨부 */}
        <MenuImageInput mode='update' imageUrl={inputValue.img_url} onChange={setImgFile} />

        {/* 입력 필드 */}
        <MenuFormFields inputValue={inputValue} categories={menuCategoriesQuery.data} onInputChange={getInputValue} />
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
