import { AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import EditAnimationIconBox from './edit-icon-box';

export default function EditIconAnimation() {
  const isEdit = useBoundStore((state) => state.konva.isEditing);

  return (
    <AnimatePresence mode='wait' initial={false}>
      {!isEdit ? (
        <EditAnimationIconBox iconKey='editBefore'>
          <FontAwesomeIcon icon={faPenToSquare} size='1x' />
        </EditAnimationIconBox>
      ) : (
        <EditAnimationIconBox iconKey='editAfter'>
          <FontAwesomeIcon icon={faCheck} size='1x' />
        </EditAnimationIconBox>
      )}
    </AnimatePresence>
  );
}
