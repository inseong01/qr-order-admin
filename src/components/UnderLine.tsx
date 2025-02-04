import styles from '../style/UnderLine.module.css';
import { Tables } from '../../database.types';

import { motion } from 'motion/react';

export default function UnderLine({
  tab,
  selectedId,
  position,
}: {
  tab: Tables<'qr-order-category-menu'>;
  selectedId: number;
  position: string;
}) {
  return (
    <>
      {selectedId === tab.id && (
        <motion.div layoutId={position} className={`${styles.line} ${styles[position]}`}></motion.div>
      )}
    </>
  );
}
