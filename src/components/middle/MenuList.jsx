import styles from '@/style/middle/MenuList.module.css';
import getMenuList from '@/lib/supabase/func/getMenuList';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { getItemInfo, resetItemState } from '@/lib/features/itemState/itemSlice';
import { list_motion } from '../../lib/motion/motion_mainPageMenuTab';
import Loader from '../Loader';
import ErrorPage from '../ErrorPage';

import { motion } from 'motion/react';
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

  // 입력한 정보 전달, 분류 input도 삽입
  function onClickOpenModal(modalType, list) {
    return () => {
      if (submitError) return;
      dispatch(changeModalState({ type: modalType, isOpen: true }));
      if (modalType !== 'edit') {
        dispatch(resetItemState());
        return;
      }
      dispatch(getItemInfo({ item: list }));
    };
  }

  if (isFirstLoad || menuList.isFetching) return <Loader />;
  if (menuList.isError) return <ErrorPage compName={'MenuList'} />;
  return (
    <>
      {menuList.data.map((list, idx) => {
        const price = list.price.toLocaleString();
        return (
          <motion.li
            key={idx}
            className={styles.list}
            onClick={onClickOpenModal('edit', list)}
            variants={list_motion}
          >
            <div className={styles.topBox}>
              <div className={styles.top}>
                <div className={styles.title}>{list.name}</div>
              </div>
            </div>
            <div className={styles.bottomBox}>
              <div className={styles.bottom}>
                <div className={styles.price}>{price}원</div>
              </div>
            </div>
          </motion.li>
        );
      })}
      <motion.li
        className={`${styles.list} ${styles.addBtn}`}
        onClick={onClickOpenModal('add')}
        variants={list_motion}
      >
        <img src={'/img/add-icon.png'} alt="상품 추가" style={{ width: 30, height: 30 }} />
        <div className="title">상품 추가</div>
      </motion.li>
    </>
  );
}
