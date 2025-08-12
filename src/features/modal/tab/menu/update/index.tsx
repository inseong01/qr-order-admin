import { ChangeEvent, FormEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import validate from '@/utils/function/validate';

import {
  initMenu,
  menuAtom,
  menuImageFileAtom,
  resetMenuImageFileAtom,
  setMenuImageFileAtom,
} from '@/components/ui/menu/store/atom';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { showToastAtom } from '@/features/alert/toast/store/atom';

import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { deleteMenu, updateMenu } from '@/lib/supabase/tables/menu';
import { deleteImageByFileName, updateImage } from '@/lib/supabase/storage/store';
import { generateNumberId } from '@/utils/function/generate-id';
import { updateMenuData } from '@/utils/function/set-menu';

import { setModalClickAtom } from '../../store/atom';
import { MenuFormFields, MenuImageInput, MenuModalHeader } from '../components/common';
import styles from './../index.module.css';

export default function UpdateMenuModal() {
  const [inputValue, setInputValue] = useAtom(menuAtom);
  const menuImageFile = useAtomValue(menuImageFileAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const showToast = useSetAtom(showToastAtom);
  const setMenuImage = useSetAtom(setMenuImageFileAtom);
  const resetMenuImage = useSetAtom(resetMenuImageFileAtom);
  const { showConfirmModal } = useConfirmModal();
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();
  const imgFileId = inputValue.img_url.split('menu_').at(-1) ?? '';

  /* 비즈니스 로직 */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.name;
    const title = submitType === 'update' ? '메뉴를 수정하겠습니까?' : '메뉴를 삭제하겠습니끼?';
    const onConfirm = async () => {
      // 메뉴 데이터 가공
      const hasImg = !!menuImageFile;
      const newImgFileId = generateNumberId();
      const fileId = imgFileId === 'default' ? newImgFileId : imgFileId;
      const menuCategories = menuCategoriesQuery.data;
      const menuData = updateMenuData({ fileId, inputValue, menuCategories, hasImg });

      // 값 검증
      const valid = await validate.updateMenuValue(menuData);
      if (!valid.success) {
        const message = valid.error.issues[0].message;
        alert(message);
        return;
      }

      // 이미지 스토리지 업데이트
      try {
        if (menuImageFile) {
          await updateImage({ file: menuImageFile, fileId });
        }

        if (submitType === 'delete') {
          await deleteImageByFileName({ fileId: imgFileId });
        }
      } catch (err) {
        console.error(e);
        showToast('이미지 처리 과정에서 오류가 발생했습니다');
        return;
      }

      // 메뉴 업데이트
      try {
        submitType === 'update' ? await updateMenu(menuData.id, menuData) : await deleteMenu(menuData.id);
        await menuListQuery.refetch();
      } catch (e) {
        console.error(e);
        showToast('메뉴 처리 과정에서 오류가 발생했습니다');
        return;
      }

      // 데이터 처리 상태 알림
      showToast(submitType === 'update' ? '수정되었습니다' : '삭제되었습니다.');

      // 초기화
      setModalClick(false);
      setInputValue(initMenu);
      resetMenuImage();
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
    <form className={styles.menuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        {/* 모달 주제 */}
        <MenuModalHeader title='음식 수정' onClose={handleClose} />

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
