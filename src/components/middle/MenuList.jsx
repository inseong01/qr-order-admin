import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { getItemInfo } from '@/lib/features/itemState/itemSlice';
import useQueryMenuList from '../../lib/hook/useQuery/useQueryMenuList';
import AddMenu from './AddMenu';
import Menu from './Menu';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function MenuList() {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const selectedCategory = useSelector((state) => state.categoryState);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const submitError = useSelector((state) => state.submitState.isError);
  const submitStatus = useSelector((state) => state.submitState.status);
  // hook
  const menuList = useQueryMenuList();

  // 메뉴 새로 패치
  useEffect(() => {
    /*
      메뉴 생성 리패치, useEffect 사용 이유
      - ModalFormState.jsx에서 추가하기 버튼을 누른 다음 리패치는 새로운 데이터를 받아오지 못함
        dispatch, await 코드 순은 순서대로 동작하지 않음  
      - menuList의 useQuery key 추가 할당은 enabled 설정이 복잡하고 서로 다른 쿼리가 생성되어 캐시 공유 못함
    */
    //  refetch 제한
    if (tab !== 'menu') return;
    if (!isSubmit) return;
    if (menuList.isFetched && submitStatus === 'fulfilled') {
      menuList.refetch();
    }
  }, [tab, isSubmit, submitStatus, menuList]);

  // 모달창 열기
  function onClickOpenModal(modalType, list) {
    return () => {
      if (submitError) return;
      dispatch(changeModalState({ type: modalType, isOpen: true }));
      // 상품 추가
      if (modalType === 'insert') {
        const sort = selectedCategory.title === '전체메뉴' ? '' : selectedCategory.title;
        dispatch(getItemInfo({ item: list, sort }));
        return;
      }
      // 상품 수정
      dispatch(getItemInfo({ item: list }));
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
