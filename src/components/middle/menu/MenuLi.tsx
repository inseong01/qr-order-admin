import { AnimatePresence } from 'motion/react';
import useQueryMenuList from '../../../lib/hook/useQuery/useQueryMenuList';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { ModalType } from '../../../lib/store/useModalSlice';
import { MenuList } from '../../../types/common';
import AddMenu from './AddMenu';
import Menu from './Menu';

import { useEffect } from 'react';

export default function MenuLi() {
  // hook
  const { data, refetch } = useQueryMenuList();
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const submitError = useBoundStore((state) => state.submit.isError);
  const selectedCategory = useBoundStore((state) => state.category);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const getItemInfo = useBoundStore((state) => state.getItemInfo);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const setInitSubmitStatus = useBoundStore((state) => state.setInitSubmitStatus);
  // variant
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
    //  해당 tab에서만 실행되도록 제한
    if (tab !== 'menu') return;
    // 메뉴 생성/수정 시 메뉴 리패치
    if (submitStatus === 'fulfilled') {
      refetch();
      // fulfilled 상태서 클릭 시 리패치 되는 상황 방지
      setInitSubmitStatus();
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
        // 상품 추가
        const sortId = selectedCategory.id;
        getItemInfo({ item, sortId });
        return;
      } else if (modalType === 'update') {
        // 상품 수정
        getItemInfo({ item, sortId: item.sortId });
      }
    };
  }

  return (
    <>
      <AddMenu onClickOpenModal={onClickOpenModal} />
      <AnimatePresence>
        {currentMenuList?.map((list: MenuList, idx: number) => {
          return <Menu key={idx} onClickOpenModal={onClickOpenModal} list={list} />;
        })}
      </AnimatePresence>
    </>
  );
}
