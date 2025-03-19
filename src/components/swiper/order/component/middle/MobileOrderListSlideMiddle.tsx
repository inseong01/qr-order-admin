import { ReactNode } from 'react';
import { AllOrderList } from '../../../../../types/common';
import OrderSlideBottom from '../../OrderSlideBottom';
import OrderSlideMiddle from '../../OrderSlideMiddle';

import { AnimatePresence, motion } from 'motion/react';

export default function MobileOrderListSlideMiddle({
  isExistId,
  list,
}: {
  isExistId: boolean;
  list: AllOrderList;
}) {
  return (
    <MiddleBoxComponent isExistId={isExistId}>
      <OrderSlideMiddle orderList={list.orderList} />
      <OrderSlideBottom list={list} />
    </MiddleBoxComponent>
  );
}

function MiddleBoxComponent({ children, isExistId }: { children: ReactNode; isExistId: boolean }) {
  return (
    <AnimatePresence>
      {isExistId && (
        <motion.div
          key={'orderList'}
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
