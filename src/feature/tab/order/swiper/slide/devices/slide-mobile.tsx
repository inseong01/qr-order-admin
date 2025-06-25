import { AnimatePresence, motion } from 'motion/react';

import { AllOrderList } from '../../../../../../types/common';

import OrderListView from './components/list-view';
import OrderListFooter from './components/list-footer';

export default function OrderListSlideMobile({
  isSlideClicked,
  list,
}: {
  isSlideClicked: boolean;
  list: AllOrderList;
}) {
  return (
    <AnimatePresence>
      {isSlideClicked && (
        <motion.div key={'orderList'} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
          {/* 주문목록 */}
          <OrderListView orderList={list.orderList} />

          {/* 푸터 */}
          <OrderListFooter list={list} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
