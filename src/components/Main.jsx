import styles from '@/style/Main.module.css';
import MainPageList from './MainPageList';
import AddMenuModal from './modal/AddMenuModal';
import AlertMsg from './AlertMsg';
import ConfirmModal from './modal/ConfirmModal';
import Widget from './Widget';

export default function Main() {
  return (
    <main className={styles.main}>
      <MainPageList type={'table'} />
      {/* <AddMenuModal /> */}
      {/* <AlertMsg /> */}
      {/* <ConfirmModal /> */}
      <Widget />
    </main>
  );
}
