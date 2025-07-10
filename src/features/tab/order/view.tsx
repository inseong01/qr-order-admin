
import OrderCards from './components/order-cards';
import { useOrderTab } from './hooks/use-order-tab';

export default function OrderTabView() {
  const { orders, isDone } = useOrderTab();

  return <OrderCards orders={orders} isDone={isDone} />;
}
