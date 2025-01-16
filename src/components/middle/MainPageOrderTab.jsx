import ConfirmModal from '../modal/ConfirmModal';
import OrderSection from './order/OrderSection';

export default function MainPageOrderTab() {
  return (
    <>
      <OrderSection />
      <ConfirmModal title={'주문'} />
    </>
  );
}
