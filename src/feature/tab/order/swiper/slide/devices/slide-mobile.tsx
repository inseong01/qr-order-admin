import { AnimatePresence, motion } from 'motion/react';

import { useBoundStore } from '../../../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../../../types/common';

import OrderListView from './components/list-view';
import OrderListFooter from './components/list-footer';

export default function OrderListSlideMobile({ isIdExist, list }: { isIdExist: boolean; list: AllOrderList }) {
  const categoryId = useBoundStore((state) => state.category.id);

  return (
    <AnimatePresence>
      {isIdExist && (
        <motion.div key={'orderList'} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
          {/* 주문목록 */}
          <OrderListView orderList={list.orderList} />

          {/* 푸터 */}
          <OrderListFooter list={list} id={categoryId} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
