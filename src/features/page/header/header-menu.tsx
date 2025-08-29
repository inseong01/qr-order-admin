import { useAtomValue, useSetAtom } from 'jotai';

import Tab from '@/components/ui/tab';
import { headerTabIdxAtom } from '.';

export default function HeaderMenuTab() {
  const headerTabIdx = useAtomValue(headerTabIdxAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);

  const handleTabClick = async (tabIdx: number) => {
    if (headerTabIdx === tabIdx) return;
    setHeaderTabIdx(tabIdx);
  };

  return (
    <Tab
      key={'header-all-menu'}
      text={'전체 메뉴'}
      isSelected={headerTabIdx === 0}
      handleTabClick={() => handleTabClick(0)}
    />
  );
}
