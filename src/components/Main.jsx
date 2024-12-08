import styles from '@/style/Main.module.css';
import MainPageList from './middle/MainPageList';
import ConfirmModal from './modal/ConfirmModal';
import Widget from './Widget';
import AlertMsg from './AlertMsg';

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
