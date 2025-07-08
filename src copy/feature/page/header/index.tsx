import { atom, useAtomValue, useSetAtom } from 'jotai';

import styles from '@/feature/page/header/index.module.css';
import Timer from '@/feature/timer';

import Tab from '@/components/styles/tab';

import { footerAtom } from '../footer';
import { useEffect } from 'react';

/*
메뉴 탭부터 리뉴얼
상단 탭으로 카테고리 항목 표시 X
메뉴 상하 스크롤로 카테고리 정렬 표시 O
*/

export const headerTabIdxAtom = atom(0);

export default function Header() {
  const footerTab = useAtomValue(footerAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);

  useEffect(() => {
    setHeaderTabIdx(0);
  }, [footerTab]);

  const component = {
    menu: HeaderMenuTab,
    table: HeaderTableTab,
    order: HeaderOrderTab,
  };
  const HeaderTabList = component[footerTab];

  return (
    <header className={styles.header}>
      {/* 탭 목록 */}
      <ul className={styles.categories}>
        <HeaderTabList />
      </ul>

      {/* 현재 시간 */}
      <Timer />
    </header>
  );
}

function HeaderMenuTab() {
  const headerTabIdx = useAtomValue(headerTabIdxAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);

  const handleTabClick = async (tabIdx: number) => {
    // if (isModalOpen) return;
    if (headerTabIdx === tabIdx) return;

    setHeaderTabIdx(tabIdx);
  };

  return <Tab text={'전체 메뉴'} isSelected={headerTabIdx === 0} handleTabClick={() => handleTabClick(0)} />;
}

function HeaderTableTab() {
  const headerTabIdx = useAtomValue(headerTabIdxAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);

  const handleTabClick = async (tabIdx: number) => {
    // if (isModalOpen) return;
    if (headerTabIdx === tabIdx) return;

    setHeaderTabIdx(tabIdx);
  };

  return (
    <>
      <Tab text={'현재 구역'} isSelected={headerTabIdx === 0} handleTabClick={() => handleTabClick(0)} />
    </>
  );
}

function HeaderOrderTab() {
  const headerTabIdx = useAtomValue(headerTabIdxAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);

  const handleTabClick = async (tabIdx: number) => {
    // if (isModalOpen) return;
    if (headerTabIdx === tabIdx) return;

    setHeaderTabIdx(tabIdx);
  };

  return (
    <>
      <Tab text={'접수 0'} isSelected={headerTabIdx === 0} handleTabClick={() => handleTabClick(0)} />
      <Tab text={'완료 0'} isSelected={headerTabIdx === 1} handleTabClick={() => handleTabClick(1)} />
    </>
  );
}
