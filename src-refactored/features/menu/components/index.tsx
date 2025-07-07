import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { footerAtom } from '../../page/footer';

import { useBoundStore } from '../../../../lib/store/use-bound-store';
import { ModalType } from '../../../../lib/store/slices/modal-slice';

import { MenuList } from '../../../../types/common';

import styles from './../tab-main.module.css';

import MainModal from '../../../modal/modal-index';

import { listBoxMotion } from './motion/variants';

// import { InsertMenuItem, MenuListItem } from './menu-item';

import { useQueryMenuList } from '../../../../hooks/use-query/query';

import { ListMenu, ListMenuAdd } from '../../../components/ui/menu';

export default function MainPageMenuTab() {
  const { data, refetch } = useQueryMenuList();

  const tab = useAtomValue(footerAtom) ?? 'menu';

  const submitStatus = useBoundStore((state) => state.submit.status);
  // const submitError = useBoundStore((state) => state.submit.isError);
  // const selectedCategory = useBoundStore((state) => state.category);
  // const changeModalState = useBoundStore((state) => state.changeModalState);
  // const getItemInfo = useBoundStore((state) => state.getItemInfo);
  // const resetItemState = useBoundStore((state) => state.resetItemState);
  // const setInitSubmitStatus = useBoundStore((state) => state.setInitSubmitStatus);

  // const currentMenuList =
  //   selectedCategory.id === 0 ? data : data?.filter((list) => list.sortId === selectedCategory.id);

  const menuCategories: { [key: string]: any } = {};
  data?.forEach((v) => {
    const category = v.sort;

    if (category) {
      menuCategories[category] = menuCategories[category] ? [...menuCategories[category], v] : [v];
    }
  });

  // 메뉴 리패치
  useEffect(() => {
    /*
      메뉴 생성 리패치, useEffect 사용 이유
      - useModalSubmitData.js에서 리패치 적용은 새로운 데이터를 받아오지 못함
        : "pending", "fulfilled", "rejected" 상태 변화로 최신화 데이터 정확하게 못 받음
      - useQueryMenuList는 초기 상태 선언 필요로 useFetchSlice.js에서 리패치 선언 불가
    */
    if (tab !== 'menu') return; //  해당 tab에서만 실행되도록 제한
    if (submitStatus === 'fulfilled') {
      refetch();
      // setInitSubmitStatus(); // fulfilled 상태서 클릭 시 리패치 되는 상황 방지
    }
  }, [tab, submitStatus]);

  // 모달창 열기
  // function onClickOpenModal(modalType: ModalType, list?: MenuList) {
  //   return () => {
  //     if (submitError) return;
  //     const item = list as MenuList;

  //     resetItemState();
  //     changeModalState({ type: modalType, isOpen: true });

  //     if (modalType === 'insert') {
  //       const sortId = selectedCategory.id;
  //       getItemInfo({ item, sortId }); // 상품 추가

  //       return;
  //     } else if (modalType === 'update') {
  //       getItemInfo({ item, sortId: item.sortId }); // 상품 수정
  //     }
  //   };
  // }

  return (
    <>
      {/* 메뉴 탭 */}
      <motion.ul className={styles.listBox} variants={listBoxMotion} initial={'notLoad'} animate={'load'}>
        <div className={styles.left}>
          {/* 메뉴 항목 */}
          <AnimatePresence>
            {Object.keys(menuCategories).map(
              (category, idx) => {
                return (
                  <div key={idx} className={styles.display}>
                    <div className={styles.category}>{category}</div>

                    <div className={styles.menu}>
                      {/* 추가하기 */}
                      {/* <InsertMenuItem onClickOpenModal={onClickOpenModal} /> */}
                      <ListMenuAdd />

                      {menuCategories[category]?.map((v: MenuList) => {
                        return <ListMenu key={v.id} title={v.name} price={v.price.toLocaleString()} />;
                      })}
                    </div>
                  </div>
                );
              }

              // {currentMenuList?.map((list: MenuList, idx: number) => {
              //   return <MenuListItem key={idx} onClickOpenModal={onClickOpenModal} list={list} />;
              // })}
            )}
          </AnimatePresence>
        </div>

        <div className={styles.right}>
          <AddMenuModal />
        </div>
      </motion.ul>

      {/* 모달 */}
      <MainModal />
    </>
  );
}

const AddMenuModal = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClose = () => {};

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

      <button type='submit' className={styles.submit}>
        추가하기
      </button>
    </form>
  );
};
