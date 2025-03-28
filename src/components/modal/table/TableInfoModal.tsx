import styles from '@/style/modal/table/TableInfoModal.module.css';
import useModalSubmitData from '../../../lib/hook/useModalSubmitData';
import TableInfo from './TableInfo';

export default function TableInfoModal() {
  const { onTableSubmitData } = useModalSubmitData();
  return (
    <form className={styles.submitForm} onSubmit={onTableSubmitData}>
      <div className={styles.wrap}>
        <TableInfo />
      </div>
    </form>
  );
}
