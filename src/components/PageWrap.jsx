import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import useSubscribeDBTable from '../lib/hook/useSubscribeDBTable';

export default function PageWrap() {
  const change = useSubscribeDBTable('*');

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
