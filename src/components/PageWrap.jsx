import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { useSubscribeDBTable } from '../lib/hook/useSubscribeDBTable';

export default function PageWrap() {
  // Supabase Realtime 구독
  useSubscribeDBTable('*');

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
