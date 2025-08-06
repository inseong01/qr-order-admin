import { ChangeEvent } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import validate from '@/utils/function/validate';

import { initMenu, menuAtom, menuImageFileAtom, setMenuImageFileAtom } from '@/components/ui/menu/store/atom';

import { useQueryMenuCategoryList, useQueryMenuList } from '@/hooks/use-query/query';

import { addMenu } from '@/lib/supabase/tables/menu';
import { uploadImage } from '@/lib/supabase/storage/store';
import { buildMenuData } from '@/utils/function/set-menu';
import { generateNumberId } from '@/utils/function/generate-id';

import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { openSubmissionAlertAtom } from '@/features/alert/popup/store/atom';

import { setModalClickAtom } from '../../store/atom';
import styles from './../index.module.css';
import { MenuFormFields, MenuImageInput, MenuModalHeader } from '../components/common';

export default function CreateMenuModal() {
  const [inputValue, setInputValue] = useAtom(menuAtom);
  const menuImage = useAtomValue(menuImageFileAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const openSubmissionAlert = useSetAtom(openSubmissionAlertAtom);
  const setMenuImage = useSetAtom(setMenuImageFileAtom);
  const { showConfirmModal } = useConfirmModal();
  const menuListQuery = useQueryMenuList();
  const menuCategoriesQuery = useQueryMenuCategoryList();

  /* 비즈니스 로직 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = '메뉴를 추가하겠습니까?';
    const onConfirm = async () => {
      // 메뉴 데이터 가공
      const newId = generateNumberId();
      const fileId = menuImage ? newId : '';
      const menuCategories = menuCategoriesQuery.data;
      const menuData = buildMenuData({ fileId, inputValue, menuCategories });

      // 메뉴 데이터 검증
      const valid = await validate.createMenuValue(menuData);
      if (!valid.success) {
        const message = valid.error.issues[0].message;
        alert(message);
        return;
      }

      // 이미지 스토리지 삽입
      try {
        if (menuImage) {
          await uploadImage({ file: menuImage, fileId });
        }
      } catch (err) {
        console.error(e);
        openSubmissionAlert('이미지 첨부 과정에서 오류가 발생했습니다');
        return;
      }

      // 메뉴 데이터 발신
      try {
        await addMenu(menuData); // 메뉴 삽입
        await menuListQuery.refetch(); // 메뉴 리패치
      } catch (e) {
        console.error(e);
        openSubmissionAlert('메뉴 추가 과정에서 오류가 발생했습니다');
        return;
      }

      // 데이터 처리 상태 알림
      openSubmissionAlert('추가되었습니다.');

      // 초기화
      setModalClick(false);
      setInputValue(initMenu);
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
    <form className={styles.menuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        {/* 모달 주제 */}
        <MenuModalHeader title='음식 추가' onClose={handleClose} />

        {/* 사진 첨부 */}
        <MenuImageInput mode='create' imageUrl={''} onChange={setImgFile} />

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
