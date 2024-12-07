import styles from '@/style/Main.module.css';
import MainPageList from './middle/MainPageList';
import ConfirmModal from './modal/ConfirmModal';
import Widget from './Widget';
import AlertMsg from './AlertMsg';

import dynamic from 'next/dynamic';

// const NoSSRMainpageList = dynamic(() => import('./MainPageList'), {
//   ssr: false
// })

export default function Main() {
  return (
    <main className={styles.main}>
      {/* <NoSSRMainpageList type={'table'} /> */}
      <MainPageList />
      <AlertMsg />
      <Widget />
    </main>
  );
}
