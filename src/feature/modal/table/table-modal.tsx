import { useBoundStore } from '../../../lib/store/use-bound-store';

import TableInfoPannel from './table-info/table-info';

export default function TableModalRouter() {
  const modalType = useBoundStore((state) => state.modal.type);

  switch (modalType) {
    case 'info': {
      return <TableInfoPannel />;
    }
  }
}
