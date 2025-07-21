import { AnimatePresence, motion } from 'motion/react';

/** 아이콘 전환 컴포넌트 */
export function AnimatedIconSwitcher({
  isSaveMode,
  initIconSrc,
  changedIconSrc,
  alt,
}: {
  isSaveMode: boolean;
  initIconSrc: string;
  changedIconSrc: string;
  alt: string;
}) {
  return (
    <AnimatePresence mode='popLayout' initial={false}>
      {!isSaveMode ? (
        <motion.img
          src={initIconSrc}
          alt={alt}
          key={initIconSrc}
          initial={{ x: '-105%' }}
          animate={{ x: '0' }}
          exit={{ x: '-105%' }}
        />
      ) : (
        <motion.img
          src={changedIconSrc}
          alt={alt}
          key={changedIconSrc}
          initial={{ x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '-105%' }}
        />
      )}
    </AnimatePresence>
  );
}

/** 글자 전환 컴포넌트 */
export function AnimatedTextSwitcher({
  isSaveMode,
  initText,
  changedText,
}: {
  isSaveMode: boolean;
  initText: string;
  changedText: string;
}) {
  return (
    <AnimatePresence mode='popLayout' initial={false}>
      {!isSaveMode ? (
        <motion.span key={initText} initial={{ x: '-105%' }} animate={{ x: '0' }} exit={{ x: '-105%' }}>
          {initText}
        </motion.span>
      ) : (
        <motion.span key={changedText} initial={{ x: '100%' }} animate={{ x: '0' }} exit={{ x: '-105%' }}>
          {changedText}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
