import { ChangeEvent, FormEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { STORE } from '@/lib/supabase/storage/const';

import validate from '@/util/function/menu-validate';

import {
  clearMenuErrorFormAtom,
  clearSelectedMenuAtom,
  draftMenuAtom,
  resetMenuErrorAtom,
  setMenuErrorAtom,
} from '@/components/ui/menu/store/atom';
import { MenuFormInputs } from '@/components/ui/menu/types';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';

import { useQueryMenuCategoryList } from '@/hooks/use-query/menu-category/query';
import { useMutationDeleteMenu, useMutationUpdateMenu } from '@/hooks/use-query/menu/query';
import { useMutationDeleteImage, useMutationUploadImage } from '@/hooks/use-query/storage/query';

import { MenuFormFields } from '../components/form';
import { MenuModalHeader } from '../components/header';
import { MenuImageInput } from '../components/image';

import styles from './../index.module.css';
import { updateMenuData } from '../util/set-menu';
import { setModalClickAtom } from '../../store/atom';
import { imageFileAtom, resetMenuImageFileAtom, setMenuImageFileAtom } from '../store/atom';

export default function UpdateMenuModal() {
  const [inputValue, setInputValue] = useAtom(draftMenuAtom);
  const menuImageFile = useAtomValue(imageFileAtom);
  const setMenuError = useSetAtom(setMenuErrorAtom);
  const resetMenuError = useSetAtom(resetMenuErrorAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const setMenuImage = useSetAtom(setMenuImageFileAtom);
  const resetMenuImage = useSetAtom(resetMenuImageFileAtom);
  const clearSelectedMenu = useSetAtom(clearSelectedMenuAtom);

  const { showConfirmModal } = useConfirmModal();
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const mutationDeleteImage = useMutationDeleteImage(true);
  const mutationUpdateMenu = useMutationUpdateMenu();
  const mutationDeleteMenu = useMutationDeleteMenu();
  const mutationUploadImage = useMutationUploadImage();

  /* 비즈니스 로직 */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.name;
    const title = submitType === 'update' ? '메뉴를 수정하겠습니까?' : '메뉴를 삭제하겠습니끼?';

    // 메뉴 데이터 가공
    const menuCategories = menuCategoriesQuery.data;
    const menuData = updateMenuData({ inputValue, menuCategories, menuImageFile });

    if (!menuData) return;

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
      // 이미지 스토리지 업데이트
      const filename = menuData.img_url;
      try {
        if (submitType === 'update' && menuImageFile) {
          const prevFilename = inputValue.img_url;
          await mutationDeleteImage.mutateAsync({ filenames: [`${STORE}/${prevFilename}`] });
          await mutationUploadImage.mutateAsync({ file: menuImageFile, filename });
        } else if (submitType === 'delete' && !filename.includes('menu_default')) {
          await mutationDeleteImage.mutateAsync({ filenames: [`${STORE}/${filename}`] });
        }
      } catch (err) {
        return e.preventDefault();
      }

      // 메뉴 업데이트
      try {
        if (submitType === 'update') {
          await mutationUpdateMenu.mutateAsync({ id: menuData.id, menuData });
        } else if (submitType === 'delete') {
          await mutationDeleteMenu.mutateAsync({ id: inputValue.id });
        }
      } catch (err) {
        return e.preventDefault();
      }

      // 초기화
      setModalClick(false);
      clearSelectedMenu();
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
          menu_category: { title: value, id: '' },
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
