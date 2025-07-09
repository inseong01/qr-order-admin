import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { footerAtom } from '../../page/footer';

// import { useBoundStore } from '../../../../lib/store/use-bound-store';

// import { MenuList } from '../../../../types/common';

import styles from './../index.module.css';

// import MainModal from '../../../modal/modal-index';

// import { listBoxMotion } from './motion/variants';

// import { InsertMenuItem, MenuListItem } from './menu-item';

import { ListMenu, ListMenuAdd } from '../../../components/ui/menu';
import { listBoxMotion } from './motion/variants';

import { useQueryMenuList } from '@/hooks/use-query/query';

import { Menu } from '@/lib/supabase/function/menu';

import MenuModal from '@/features/modal/menu';
import Widget from '@/features/widget';

import mockData from '@/mock/data.test.json';

export default function MainPageMenuTab() {
  // const { data, refetch } = useQueryMenuList();

  const tab = useAtomValue(footerAtom) ?? 'menu';

  // const submitStatus = useBoundStore((state) => state.submit.status);
  // const submitError = useBoundStore((state) => state.submit.isError);
  // const selectedCategory = useBoundStore((state) => state.category);
  // const changeModalState = useBoundStore((state) => state.changeModalState);
  // const getItemInfo = useBoundStore((state) => state.getItemInfo);
  // const resetItemState = useBoundStore((state) => state.resetItemState);
  // const setInitSubmitStatus = useBoundStore((state) => state.setInitSubmitStatus);

  // const currentMenuList =
  //   selectedCategory.id === 0 ? data : data?.filter((list) => list.sortId === selectedCategory.id);

  const menuCategories: { [key: string]: any } = {};
  mockData?.forEach((v) => {
    const category = v.category_id;
    // 카테고리명 매칭 추가 필요

    if (category) {
      menuCategories[category] = menuCategories[category] ? [...menuCategories[category], v] : [v];
    }
  });
  const menuCateogoryKeys = Object.keys(menuCategories);

  // 메뉴 리패치
  useEffect(() => {
    /*
      메뉴 생성 리패치, useEffect 사용 이유
      - useModalSubmitData.js에서 리패치 적용은 새로운 데이터를 받아오지 못함
        : "pending", "fulfilled", "rejected" 상태 변화로 최신화 데이터 정확하게 못 받음
      - useQueryMenuList는 초기 상태 선언 필요로 useFetchSlice.js에서 리패치 선언 불가
    */
    if (tab !== 'menu') return; //  해당 tab에서만 실행되도록 제한
    // if (submitStatus === 'fulfilled') {
    //   refetch();
    //   // setInitSubmitStatus(); // fulfilled 상태서 클릭 시 리패치 되는 상황 방지
    // }
  }, [tab]);
  // }, [tab, submitStatus]);

  return (
    <>
      {/* 메뉴 탭 */}
      <motion.ul className={styles.listBox} variants={listBoxMotion} initial={'notLoad'} animate={'load'}>
        {/* 메뉴 항목 */}
        <AnimatePresence>
          {menuCateogoryKeys.length === 0 ? (
            <li>메뉴를 생성해주세요</li>
          ) : (
            menuCateogoryKeys.map((category, idx) => {
              return (
                <li key={idx} className={styles.display}>
                  <div className={styles.category}>{category}</div>

                  <div className={styles.menu}>
                    {/* 추가하기 */}
                    <ListMenuAdd />

                    {menuCategories[category]?.map((m: Menu) => {
                      return <ListMenu key={m.id} {...m} />;
                    })}
                  </div>
                </li>
              );
            })
          )}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

// <li className={styles.rightBox}>
//   {/* 위젯 */}
//   <Widget />

//   {/* 모달 */}
//   <MenuModal />
// </li>
