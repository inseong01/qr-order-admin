import { AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import EditAnimationIconBox from './edit-icon-box';

export default function EditIconAnimation() {
  const isEdit = useBoundStore((state) => state.widget.isEdit);

  return (
    <AnimatePresence mode='wait' initial={false}>
      {!isEdit ? (
        <EditAnimationIconBox key='editBefore'>
          <FontAwesomeIcon icon={faPenToSquare} size='1x' />
        </EditAnimationIconBox>
      ) : (
        <EditAnimationIconBox key='editAfter'>
          <FontAwesomeIcon icon={faCheck} size='1x' />
        </EditAnimationIconBox>
      )}
    </AnimatePresence>
  );
}
