import { CardObj } from '../../util/types';
import CardButton from '../button';
import styles from './index.module.css';

type CardFooterProps = {
  order: CardObj;
};

export default function CardFooter({ order }: CardFooterProps) {
  const orderId = order.footer.orderId;
  const inactive = order.isDone ?? false;

  return (
    <div className={styles.footer} data-finished={order.isDone}>
      {/* 완료 */}
      <CardButton orderId={orderId} inavtive={inactive} type='complete' />
    </div>
  );
}
