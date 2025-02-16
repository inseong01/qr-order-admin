import { useSubscribeDBTable } from '../lib/hook/useSubscribeDBTable';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';

export default function PageWrap() {
  // Supabase Realtime 구독
  useSubscribeDBTable(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
