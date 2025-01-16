import TableAlertMsg from '../alertMsg/TableAlertMsg';
import MainModal from '../modal/MainModal';
import KonvaSection from './konva/KonvaSection';

export default function MainPageTableTab() {
  return (
    <>
      <KonvaSection />
      <MainModal />
      <TableAlertMsg />
    </>
  );
}
