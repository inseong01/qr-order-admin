import { CardObj } from '@/utils/function/generate-card';

import CardButton from '../button';
import styles from './index.module.css';

type CardFooterProps = {
  order: CardObj;
};

export default function CardFooter({ order }: CardFooterProps) {
  return (
    <div className={styles.footer}>
      {/* 완료 */}
      <CardButton orderId={order.footer.orderId} type='complete' />
    </div>
  );
}
