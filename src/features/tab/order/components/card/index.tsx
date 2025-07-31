import { ReactNode } from 'react';

import { CardObj } from '@/utils/function/generate-card';

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
        <CardHeader header={order.header} />

        <CardMain order={order} />
      </div>

      <CardFooter order={order} />
    </CardBox>
  );
}

type CardBoxProps = {
  children: ReactNode;
  order: CardObj;
};

function CardBox({ children, order }: CardBoxProps) {
  return (
    <li className={styles.card} data-start={order.isStart} data-end={order.isEnd}>
      {children}
    </li>
  );
}
