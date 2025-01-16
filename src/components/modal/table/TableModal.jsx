import { useBoundStore } from '../../../lib/store/useBoundStore';
import TableInfoModal from './TableInfoModal';

export default function TableModal() {
  const modalType = useBoundStore((state) => state.modal.type);
  switch (modalType) {
    case 'info': {
      // MainPageTableTab.jsx
      return <TableInfoModal />;
    }
  }
}
