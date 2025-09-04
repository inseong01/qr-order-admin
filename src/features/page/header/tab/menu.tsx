import { useAtomValue } from 'jotai';

import Tab from '@/components/ui/tab';

import { headerTabAtom } from '../store/atom';

export default function HeaderMenuTab() {
  const headerTabIdx = useAtomValue(headerTabAtom);

  return <Tab key={'header-all-menu'} text={'전체 메뉴'} isSelected={headerTabIdx === 0} handleTabClick={() => {}} />;
}
