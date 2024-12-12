import styles from '@/style/Main.module.css';
import MainPageList from './middle/MainPageList';
import Widget from './Widget';
import AlertMsg from './AlertMsg';
import TableAlertMsg from './alertMsg/TableAlertMsg';

export default function Main() {
  return (
    <main className={styles.main}>
      <MainPageList />
      <AlertMsg />
      <Widget />
      <TableAlertMsg />
    </main>
  );
}
