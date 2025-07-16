import { useAtomValue, useSetAtom } from 'jotai';

import mockData from '@/mock/menu.test.json';
import { resetIdState, idAtom } from '@/store/atom/id-atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';

import { tabModalAtom } from '../../store/atom';
import styles from './../index.module.css';

export default function CreateMenuModal() {
  const menuId = useAtomValue(idAtom);
  const setModal = useSetAtom(tabModalAtom);
  const resetMenuId = useSetAtom(resetIdState);

  const { showConfirmModal } = useConfirmModal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 데이터 선별 로직

    const title = '메뉴를 추가하겠습니까?';
    const onConfirm = () => {
      // TODO: 실제 제출 로직 구현 (예: API 호출)
      // create: supabase menu 테이블로 값 전달 (id는 자동할당)
      // 처리 완료 되면 선택 초기화 O
      // 그렇지 않으면 선택 초기화 X
      // 모달 창 닫으면 선택 초기화 O
    };
    showConfirmModal({ title, onConfirm });
  };

  const handleClose = () => {
    setModal(null);
    resetMenuId();
  };

  const currentMenu = mockData.filter((m) => m.id === menuId);

  return (
    <form className={styles.addMenuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>음식 추가</h2>
          <button type='button' className={styles.close} onClick={handleClose}>
            <img src='' alt='close icon' />
          </button>
        </div>

        <label className={styles.imgInput} htmlFor='thumbnail'>
          <button type='button' className={styles.iconBox} onClick={handleClose}>
            <img src='' alt='img input icon' />
          </button>

          <span>사진 첨부</span>

          <input type='file' id='thumbnail' hidden />
        </label>

        <div className={styles.main}>
          <label className={styles.inputWrapper} htmlFor='foodName'>
            <span className={styles.inputTitle}>음식명</span>

            <input type='text' id='foodName' placeholder='음식명을 입력해주세요.' />
          </label>

          <label className={styles.inputWrapper} htmlFor='category'>
            <span className={styles.inputTitle}>분류</span>

            <select className={styles.options} id='category'>
              <option>분류 1</option>
              <option>분류 2</option>
              <option>분류 3</option>
            </select>
          </label>

          <label className={styles.inputWrapper} htmlFor='price'>
            <span className={styles.inputTitle}>가격</span>

            <input type='text' id='price' placeholder='가격을 입력해주세요.' />
          </label>

          <label className={styles.inputWrapper} htmlFor='status'>
            <span className={styles.inputTitle}>판매 상태</span>

            <select className={styles.options} id='status'>
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
