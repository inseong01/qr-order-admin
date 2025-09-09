import { CardObj } from './util/types';

export type DataWrapperProps = {
  data: DataComponentProps['data'];
  error: boolean;
};

export type DataComponentProps = {
  data: {
    orderCardList: CardObj[];
    isEmpty: boolean;
  };
};
