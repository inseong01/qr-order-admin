import useQueryMenuList from '../../lib/hook/useQuery/useQueryMenuList';
import { useBoundStore } from '../../lib/store/useBoundStore';
import AddMenu from './AddMenu';
import Menu from './Menu';

import { useEffect } from 'react';

export default function MenuList() {
  // hook
  const menuList = useQueryMenuList();
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const submitError = useBoundStore((state) => state.submit.isError);
  const selectedCategory = useBoundStore((state) => state.category);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const getItemInfo = useBoundStore((state) => state.getItemInfo);

  // 메뉴 리패치
  useEffect(() => {
    /*
      메뉴 생성 리패치, useEffect 사용 이유
      - useModalSubmitData.js에서 리패치 적용은 새로운 데이터를 받아오지 못함
        : "pending", "fulfilled", "rejected" 상태 변화로 최신화 데이터 정확하게 못 받음
      - useQueryMenuList는 초기 상태 선언 필요로 useFetchSlice.js에서 리패치 선언 불가
    */
    //  refetch 제한
    if (tab !== 'menu') return;
    if (menuList.isFetched && submitStatus === 'fulfilled') {
      menuList.refetch();
    }
  }, [tab, submitStatus, menuList]);

  // 모달창 열기
  function onClickOpenModal(modalType, list) {
    return () => {
      if (submitError) return;
      changeModalState({ type: modalType, isOpen: true });
      // 상품 추가
      if (modalType === 'insert') {
        // 전체메뉴 카테고리일 때 빈 문자열로 분류 미지정 할당
        const sort = selectedCategory.title === '전체메뉴' ? '' : selectedCategory.title;
        getItemInfo({ item: list, sort });
        return;
      }
      // 상품 수정
      getItemInfo({ item: list });
    };
  }

  return (
    <>
      {menuList.data && (
        <>
          {menuList.data?.map((list, idx) => {
            return <Menu key={idx} onClickOpenModal={onClickOpenModal} list={list} />;
          })}
          <AddMenu onClickOpenModal={onClickOpenModal} />
        </>
      )}
    </>
  );
}
