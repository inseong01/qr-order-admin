import useQueryTabMenu from '../../lib/hook/useQuery/useQueryTabMenu';
import TabMenu from './TabMenu';

// DB, footerList 추가 시 tabSlice.js switch case 영문 명 반환 추가
export default function FooterList() {
  const data = useQueryTabMenu();

  return (
    <>
      {data?.map((tab) => {
        return <TabMenu key={tab.id} tab={tab} />;
      })}
    </>
  );
}
