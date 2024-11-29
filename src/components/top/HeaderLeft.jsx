import styles from '@/style/top/HeaderLeft.module.css';
import { changeCategoryKey, resetCategoryState } from '@/lib/features/categoryState/categorySlice';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderLeft({ tabCategory, allOrderList, tab }) {
  let title = '';
  // useSelector
  const categoryKey = useSelector((state) => state.categoryState.key);
  // useDispatch
  const dispatch = useDispatch();

  useEffect(
    function changeTab() {
      dispatch(resetCategoryState());
    },
    [tab]
  );

  function onClickChangeTabCategory({ key, title }) {
    return () => {
      dispatch(changeCategoryKey({ key, title }));
    };
  }

  switch (tab) {
    case 'menu': {
      title = '분류';
      break;
    }
    case 'table': {
      title = '구역';
      break;
    }
    case 'order': {
      break;
    }
  }

  return (
    <AnimatePresence>
      <ul className={styles.left}>
        {!tabCategory.isLoading ? (
          <>
            {tabCategory.data.map((list, idx) => {
              return (
                <li key={idx} className={styles.categoryBox}>
                  <motion.div
                    className={`${categoryKey === list.key ? styles.clicked : ''} ${styles.category}`}
                    onClick={onClickChangeTabCategory(list)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={styles.title}>
                      {list.title}{' '}
                      {list.title === '접수' ? (allOrderList.data ? allOrderList.data.length : 0) : ''}
                    </div>
                  </motion.div>
                  {categoryKey === list.key && (
                    <motion.div className={styles.line} layoutId="headerline"></motion.div>
                  )}
                </li>
              );
            })}
            {tab !== 'order' && (
              <li className={styles.addCategoryBox}>
                <motion.div
                  className={styles.category}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key={'addBtn'}
                >
                  <Image src={'/img/add-icon.png'} alt="메뉴 추가" width={15} height={15} />
                  <div className={styles.title}>{title}</div>
                </motion.div>
              </li>
            )}
          </>
        ) : (
          <>
            <li></li>
          </>
        )}
      </ul>
    </AnimatePresence>
  );
}
