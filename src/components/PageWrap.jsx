import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import useSubscribeDBTable from '../lib/hook/useSubscribeDBTable';

export default function PageWrap() {
  useSubscribeDBTable('*');

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
