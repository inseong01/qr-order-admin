import styles from '@/style/modal/ConfirmModal.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';

export default function ConfirmTitle({ title }) {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const selectedList = useBoundStore((state) => state.itemBox.list);
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
  // variant
  const context = submitMsgType === 'delete' ? '삭제' : title === '주문' ? '완료' : '수정';
  const subTitlte = tab === 'menu' ? selectedList.map((list) => list.title).join(', ') : '';
  return (
    <div className={styles.title}>
      {title}을 {context}하시겠습니까?
      {subTitlte && (
        <div className={styles.subTitlteBox}>
          <span className={`${styles.caption} ${styles.subTitlte}`} title={subTitlte}>
            &#91; {subTitlte} &#93;
          </span>
          <span className={styles.caption}>
            카테고리와 관련된 메뉴들도 <span className={styles.caution}>일괄 삭제</span>됩니다
          </span>
        </div>
      )}
    </div>
  );
}
