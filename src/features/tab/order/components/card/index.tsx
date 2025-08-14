import { ReactNode } from 'react';

import { CardObj } from '@/features/tab/order/util/generate-card';

import CardHeader from '../header';
import CardMain from '../main';
import CardFooter from '../footer';
import styles from './index.module.css';

type CardProps = {
  order: CardObj;
};

export default function Card({ order }: CardProps) {
  return (
    <CardBox order={order}>
      <div className={styles.contents}>
        {order.isStart && <CardHeader header={order.header} isDone={!!order.isDone} />}

        <CardMain order={order} />
      </div>

      {order.isEnd && <CardFooter order={order} />}
    </CardBox>
  );
}

type CardBoxProps = {
  children: ReactNode;
  order: CardObj;
};

function CardBox({ children, order }: CardBoxProps) {
  return (
    <li className={styles.card} data-start={order.isStart} data-end={order.isEnd} data-height={order.heightType}>
      {children}
    </li>
  );
}
