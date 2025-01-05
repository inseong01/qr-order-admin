import getMenuList from '@/lib/supabase/func/getMenuList';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { getItemInfo } from '@/lib/features/itemState/itemSlice';
import Loader from '../Loader';
import ErrorPage from '../ErrorPage';
import AddMenu from './AddMenu';
import Menu from './Menu';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function MenuList() {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const selectedCategory = useSelector((state) => state.categoryState);
  const submitError = useSelector((state) => state.submitState.isError);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const submitStatus = useSelector((state) => state.submitState.status);
  // useQuery
  const menuList = useQuery({
    queryKey: ['menuList', selectedCategory.id],
    queryFn: () => getMenuList(selectedCategory),
  });

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  // 제출되면 메뉴 데이터 새로 패치
  useEffect(() => {
    /*
      메뉴 생성 리패치, useEffect 사용 이유
      - ModalFormState.jsx에서 추가하기 버튼을 누른 다음 리패치는 새로운 데이터를 받아오지 못함
      - menuList의 useQuery key 추가 할당은 enabled 설정이 복잡하고 서로 다른 쿼리가 생성되어 캐시 공유 못함
    */
    //  refetch 제한
    if (!isSubmit) return;
    if (tab === 'menu' && submitStatus === 'fulfilled') {
      menuList.refetch();
    }
  }, [tab, isSubmit, submitStatus]);

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

  if (isFirstLoad || menuList.isFetching) return <Loader />;
  if (menuList.isError) return <ErrorPage compName={'MenuList'} />;
  return (
    <>
      {menuList.data.map((list, idx) => {
        return <Menu key={idx} onClickOpenModal={onClickOpenModal} list={list} />;
      })}
      <AddMenu onClickOpenModal={onClickOpenModal} />
    </>
  );
}
