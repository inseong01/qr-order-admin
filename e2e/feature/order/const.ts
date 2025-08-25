import mockInitOrders from './mock/order.init.json' assert { type: 'json' };

export const initOrders = mockInitOrders;

export const firstOrder = initOrders.find((o) => !o.is_done);

export const setFormattedTime = (startAt: string) =>
  new Date(startAt).toLocaleTimeString('ko-KR', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
