import { useAtomValue } from 'jotai';

import Tab from '@/components/ui/tab';

import { headerTabAtom } from '../store/atom';
import { useHeaderHandler } from '../hook/use-header-hadler';

export default function HeaderTableTab() {
  const headerTabIdx = useAtomValue(headerTabAtom);
  const { tabClick } = useHeaderHandler();

  return (
    <>
      <Tab
        key={'header-tables'}
        text={'현재 구역'}
        isSelected={headerTabIdx === 0}
        handleTabClick={() => tabClick(0)}
      />
    </>
  );
}
