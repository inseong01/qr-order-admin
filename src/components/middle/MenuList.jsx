'use client';

import styles from '@/style/middle/MenuList.module.css';
import getMenuList from '@/lib/supabase/func/getMenuList';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { getItemInfo, resetItemState } from '@/lib/features/itemState/itemSlice';
import Loader from '../Loader';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function MenuList() {
  // useState
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const selectedCategory = useSelector((state) => state.categoryState);
  const submitStatus = useSelector((state) => state.submitState.status);
  // useQuery
  const menuList = useQuery({
    queryKey: ['menuList', tab, selectedCategory, submitStatus],
    queryFn: () => getMenuList('menu', selectedCategory),
    enabled: tab === 'menu' && (submitStatus === '' || submitStatus === 'fulfilled'),
  });

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  // 입력한 정보 전달, 분류 input도 삽입
  function onClickOpenModal(type, list) {
    return () => {
      dispatch(resetSubmitState());
      dispatch(changeModalState({ isOpen: true, type }));
      if (type !== 'edit') {
        dispatch(resetItemState());
        return;
      }
      dispatch(getItemInfo({ item: list }));
    };
  }

  // motion
  const list_motion = {
    load: {
      opacity: 1,
      y: 0,
    },
    notLoad: {
      opacity: 0,
      y: -10,
    },
  };

  if (isFirstLoad || !menuList.isFetched) return <Loader />;

  return (
    <>
      {menuList.isFetched && (
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
            <Image src={'/img/add-icon.png'} alt="상품 추가" width={30} height={30} />
            <div className="title">상품 추가</div>
          </motion.li>
        </>
      )}
    </>
  );
}
