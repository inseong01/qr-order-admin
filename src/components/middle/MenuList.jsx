import getMenuList from '@/lib/supabase/func/getMenuList';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { getItemInfo, resetItemState } from '@/lib/features/itemState/itemSlice';
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
  const submitStatus = useSelector((state) => state.submitState.status);
  const submitError = useSelector((state) => state.submitState.isError);
  // useQuery
  const menuList = useQuery({
    queryKey: ['menuList', tab, selectedCategory, submitStatus],
    queryFn: () => getMenuList(selectedCategory),
    enabled: tab === 'menu',
  });

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  // 모달창 열기
  function onClickOpenModal(modalType, list) {
    return () => {
      if (submitError) return;
      dispatch(changeModalState({ type: modalType, isOpen: true }));
      if (modalType !== 'update') {
        dispatch(resetItemState());
        return;
      }
      // 입력한 정보 전달
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
