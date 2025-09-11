import { ChangeEvent, FormEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import validate from '@/util/function/menu-validate';

import { FEATURE_MESSAGES } from '@/constants/message/feature';

import {
  clearMenuErrorFormAtom,
  draftMenuAtom,
  resetMenuErrorAtom,
  setMenuErrorAtom,
} from '@/components/ui/menu/store/atom';
import { initMenu } from '@/components/ui/menu/const';
import { MenuFormInputs } from '@/components/ui/menu/types';

import { useMutationAddMenu } from '@/hooks/use-query/menu/query';
import { useMutationUploadImage } from '@/hooks/use-query/storage/query';
import { useQueryMenuCategoryList } from '@/hooks/use-query/menu-category/query';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';

import styles from './../index.module.css';
import { buildMenuData } from '../util/set-menu';
import { setModalClickAtom } from '../../store/atom';

import { MenuFormFields } from '../components/modal-form';
import { MenuModalHeader } from '../components/modal-header';
import { MenuImageInput } from '../components/modal-image';

import { MAX_FILE_SIZE } from '../const';
import { imageFileAtom, setImageFileErrorAtom, setMenuImageFileAtom } from '../store/atom';

export default function CreateMenuModal() {
  const [inputValue, setInputValue] = useAtom(draftMenuAtom);
  const menuImage = useAtomValue(imageFileAtom);
  const setMenuError = useSetAtom(setMenuErrorAtom);
  const resetMenuError = useSetAtom(resetMenuErrorAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const setMenuImage = useSetAtom(setMenuImageFileAtom);

  const { showConfirmModal } = useConfirmModal();
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const mutationUploadImage = useMutationUploadImage();
  const mutationAddMenu = useMutationAddMenu();

  /* 비즈니스 로직 */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = '메뉴를 추가하겠습니까?';

    // 메뉴 데이터 가공
    const menuCategories = menuCategoriesQuery.data;
    const menuData = buildMenuData({ menuImageFile: menuImage, inputValue, menuCategories });

    // 메뉴 데이터 검증
    const { success, error } = await validate.createMenuValue(menuData);
    if (!success) {
      setMenuError(error.issues);
      return e.preventDefault();
    }

    // 제출
    const onConfirm = async () => {
      // 이미지 스토리지 삽입
      try {
        if (menuImage) {
          await mutationUploadImage.mutateAsync({ file: menuImage, filename: menuData.img_url });
        }
      } catch (err) {
        return e.preventDefault();
      }

      // 메뉴 데이터 발신
      try {
        await mutationAddMenu.mutateAsync(menuData);
      } catch (err) {
        return e.preventDefault();
      }

      // 초기화
      setModalClick(false);
      setInputValue(initMenu);
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

  const setImageFileError = useSetAtom(setImageFileErrorAtom);

  /** 이미지 파일 설정 */
  const setImgFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setMenuImage(undefined);
      setImageFileError(FEATURE_MESSAGES.image.required);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const maxFileMB = MAX_FILE_SIZE / 1024;
      setMenuImage(undefined);
      setImageFileError(FEATURE_MESSAGES.image.sizeExceeded(maxFileMB));
      return;
    }

    setMenuImage(file);
    setImageFileError('');
  };

  return (
    <form className={styles.menuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        {/* 모달 주제 */}
        <MenuModalHeader title='메뉴 추가' onClose={handleClose} />

        {/* 사진 첨부 */}
        <MenuImageInput mode='create' onChange={setImgFile} />

        {/* 입력 필드 */}
        <MenuFormFields inputValue={inputValue} categories={menuCategoriesQuery.data} onInputChange={getInputValue} />
      </div>

      <div className={styles.submitBox}>
        <button type='submit' className={styles.submit} style={{ backgroundColor: '#4caff8' }}>
          추가하기
        </button>
      </div>
    </form>
  );
}
