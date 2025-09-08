export const formatRequestText = ({
  quantity,
  request_category: { title },
}: {
  quantity: number;
  request_category: { title: string };
}) => `${title} ${quantity}개`;
