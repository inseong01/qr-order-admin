import OrderSection from './order/OrderSection';
import ConfirmModal from '../modal/ConfirmModal';

export default function MainPageOrderTab() {
  return (
    <>
      <OrderSection />
      <ConfirmModal title={'주문'} />
    </>
  );
}
