import styles from '@/style/modal/TableInfoModal.module.css';
import createReceipt from '../../lib/function/createReceipt';
import EmptyTable from './table/EmptyTable';

import { useSelector } from 'react-redux';
import NotEmptyTable from './table/NotEmptyTable';

// id, init, orderList, tableName
// 주문목록 형태 [{ id: 주문 식별자, orderList: 주문목록 }, ...]
export default function TableInfoModal({ onSubmitData }) {
  // useSelector
  const tableInfo = useSelector((state) => state.itemState.selectedTable);
  // variable
  const allOrderList = tableInfo.order?.map((list) => list.orderList);
  const billArr = createReceipt(allOrderList);

  return (
    <form className={styles.submitForm} onSubmit={onSubmitData('table')}>
      <div className={styles.wrap}>
        {billArr.length === 0 ? (
          <EmptyTable />
        ) : (
          <NotEmptyTable billArr={billArr} tableName={tableInfo.tableName} />
        )}
      </div>
    </form>
  );
}
