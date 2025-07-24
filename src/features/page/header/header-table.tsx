import { useAtomValue, useSetAtom } from 'jotai';

import Tab from '@/components/ui/tab';
import { headerTabIdxAtom } from '.';

export default function HeaderTableTab() {
  const headerTabIdx = useAtomValue(headerTabIdxAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);

  const handleTabClick = async (tabIdx: number) => {
    if (headerTabIdx === tabIdx) return;
    setHeaderTabIdx(tabIdx);
  };

  return (
    <>
      <Tab
        key={'header-tables'}
        text={'현재 구역'}
        isSelected={headerTabIdx === 0}
        handleTabClick={() => handleTabClick(0)}
      />
    </>
  );
}
