import getTabCategory from '../../lib/supabase/func/getTabCategory';
import TabMenu from './TabMenu';

import { useQuery } from '@tanstack/react-query';

// DB, footerList 추가 시 tabSlice.js switch case 영문 명 반환 추가
export default function FooterList() {
  // useQuery
  const tabMenu = useQuery({
    queryKey: ['tabMenu'],
    queryFn: () => getTabCategory('tab'),
  });

  return (
    <>
      {tabMenu.data?.map((tab) => {
        return <TabMenu key={tab.id} tab={tab} />;
      })}
    </>
  );
}
