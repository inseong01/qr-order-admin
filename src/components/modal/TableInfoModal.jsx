import styles from '@/style/modal/TableInfoModal.module.css';
import TableInfo from './table/TableInfo';

export default function TableInfoModal({ onSubmitData }) {
  return (
    <form className={styles.submitForm} onSubmit={onSubmitData('table')}>
      <div className={styles.wrap}>
        <TableInfo />
      </div>
    </form>
  );
}
