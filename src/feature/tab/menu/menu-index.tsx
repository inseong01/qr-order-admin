import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { useBoundStore } from '../../../lib/store/use-bound-store';
import { ModalType } from '../../../lib/store/slices/modal-slice';

import { MenuList } from '../../../types/common';

import { useQueryMenuList } from '../../../hook/use-query/query';

import styles from './../tab-main.module.css';

import MainModal from '../../modal/modal-index';

import { listBoxMotion } from './motion/variants';

import { InsertMenuItem, MenuListItem } from './menu-item';

export default function MainPageMenuTab() {
  const { data, refetch } = useQueryMenuList();

  const tab = useBoundStore((state) => state.tab.title);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const submitError = useBoundStore((state) => state.submit.isError);
  const selectedCategory = useBoundStore((state) => state.category);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const getItemInfo = useBoundStore((state) => state.getItemInfo);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const setInitSubmitStatus = useBoundStore((state) => state.setInitSubmitStatus);

  const currentMenuList =
    selectedCategory.id === 0 ? data : data?.filter((list) => list.sortId === selectedCategory.id);

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
      setInitSubmitStatus(); // fulfilled 상태서 클릭 시 리패치 되는 상황 방지
    }
  }, [tab, submitStatus]);

  // 모달창 열기
  function onClickOpenModal(modalType: ModalType, list?: MenuList) {
    return () => {
      if (submitError) return;
      const item = list as MenuList;

      resetItemState();
      changeModalState({ type: modalType, isOpen: true });

      if (modalType === 'insert') {
        const sortId = selectedCategory.id;
        getItemInfo({ item, sortId }); // 상품 추가

        return;
      } else if (modalType === 'update') {
        getItemInfo({ item, sortId: item.sortId }); // 상품 수정
      }
    };
  }

  return (
    <>
      {/* 메뉴 탭 */}
      <motion.ul className={styles.listBox} variants={listBoxMotion} initial={'notLoad'} animate={'load'}>
        {/* 추가하기 */}
        <InsertMenuItem onClickOpenModal={onClickOpenModal} />

        {/* 메뉴 항목 */}
        <AnimatePresence>
          {currentMenuList?.map((list: MenuList, idx: number) => {
            return <MenuListItem key={idx} onClickOpenModal={onClickOpenModal} list={list} />;
          })}
        </AnimatePresence>
      </motion.ul>

      {/* 모달 */}
      <MainModal />
    </>
  );
}
