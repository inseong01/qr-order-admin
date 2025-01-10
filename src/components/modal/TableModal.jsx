import TableInfoModal from './TableInfoModal';

import { useSelector } from 'react-redux';

export default function TableModal() {
  const modalType = useSelector((state) => state.modalState.type);
  switch (modalType) {
    case 'info': {
      // MainPageTableTab.jsx
      return <TableInfoModal />;
    }
  }
}
