'use client';

import styles from '@/style/HeaderLeft.module.css';
import { changeCategoryKey, resetCategoryState } from '@/lib/features/categoryState/categorySlice';
import getTabCategory from '@/lib/supabase/func/getTabCategory';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import getAllOrderList from '@/lib/supabase/func/getAllOrderList';

export default function HeaderLeft() {
  // useSelector
  const type = useSelector((state) => state.tabState.state);
  const categoryKey = useSelector((state) => state.categoryState.key);
  // useQuery
  const { data } = useQuery({ queryKey: ['tabCategory', type], queryFn: () => getTabCategory(type) });
  const allOrderList = useQuery({
    queryKey: ['allOrderList', type],
    queryFn: () => getAllOrderList(type, { key: 1 }),
  });
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCategoryState());
  }, [type]);

  function onClickChangeTabCategory({ key, title }) {
    return () => {
      dispatch(changeCategoryKey({ key, title }));
    };
  }

  switch (type) {
    case 'menu': {
      return (
        <ul className={styles.left}>
          {data &&
            data.map((list, idx) => {
              return (
                <li key={idx} className={styles.categoryBox}>
                  <div
                    key={idx}
                    className={`${categoryKey === list.key ? styles.clicked : ''} ${styles.category}`}
                    onClick={onClickChangeTabCategory(list)}
                  >
                    <div className={styles.title}>{list.title}</div>
                  </div>
                  {categoryKey === list.key && (
                    <motion.div className={styles.line} layoutId="headerline"></motion.div>
                  )}
                </li>
              );
            })}
          <li className={styles.addCategoryBox}>
            <div className={styles.category}>
              <Image src={'/img/add-icon.png'} alt="메뉴 추가" width={15} height={15} />
              <div className={styles.title}>분류</div>
            </div>
          </li>
        </ul>
      );
    }
    case 'table': {
      return (
        <ul className={styles.left}>
          {data &&
            data.map((list, idx) => {
              return (
                <li key={idx} className={styles.categoryBox}>
                  <div
                    key={idx}
                    className={`${categoryKey === list.key ? styles.clicked : ''} ${styles.category}`}
                    onClick={onClickChangeTabCategory(list)}
                  >
                    <div className={styles.title}>{list.title}</div>
                  </div>
                  {categoryKey === list.key && (
                    <motion.div className={styles.line} layoutId="headerline"></motion.div>
                  )}
                </li>
              );
            })}
          <li className={styles.addCategoryBox}>
            <div className={`${styles.category}`}>
              <Image src={'/img/add-icon.png'} alt="구역 추가" width={15} height={15} />
              <div className={styles.title}>구역</div>
            </div>
          </li>
        </ul>
      );
    }
    case 'order': {
      return (
        <ul className={styles.left}>
          {data &&
            data.map((list, idx) => {
              console.log(list);
              return (
                <li key={idx} className={styles.categoryBox}>
                  <div
                    key={idx}
                    className={`${categoryKey === list.key ? styles.clicked : ''} ${styles.category}`}
                    onClick={onClickChangeTabCategory(list)}
                  >
                    <div className={styles.title}>
                      {list.title}{' '}
                      {list.title === '접수' ? (allOrderList.data ? allOrderList.data.length : 0) : ''}
                    </div>
                  </div>
                  {categoryKey === list.key && (
                    <motion.div className={styles.line} layoutId="headerline"></motion.div>
                  )}
                </li>
              );
            })}
        </ul>
      );
    }
  }
}
