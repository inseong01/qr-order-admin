import { useSubscribeDBTable } from '../lib/hook/useSubscribeDBTable';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ErrorPage from './ErrorPage';
import Loader from './Loader';

import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';

export default function PageWrap() {
  // Supabase Realtime 구독
  const { isError, isLoading } = useSubscribeDBTable(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL);
  // console.log(isLoading);
  if (isLoading) return <h1>시작 로드 컴포넌트</h1>;
  // 로딩 UI 대기
  if (isError) return <ErrorPage />;

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
