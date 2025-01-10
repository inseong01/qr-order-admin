import styles from '@/style/modal/TableInfoModal.module.css';
import useModalSubmitData from '../../lib/hook/useModalSubmitData';
import TableInfo from './table/TableInfo';

export default function TableInfoModal() {
  const { onSubmitData } = useModalSubmitData();
  return (
    <form className={styles.submitForm} onSubmit={onSubmitData('table')}>
      <div className={styles.wrap}>
        <TableInfo />
      </div>
    </form>
  );
}
