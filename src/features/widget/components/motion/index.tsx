import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { childMotion, parentsMotion } from './motion';
import styles from './index.module.css';

interface ListBoxAnimationProps {
  isAnimate: boolean;
  isRow: boolean;
  onClick: () => void;
  children: ReactNode;
}

/** 위젯 항목 공동 애니메이션 컴포넌트 */
export function ListBox({ isAnimate, isRow, onClick, children }: ListBoxAnimationProps) {
  return (
    <motion.button
      className={styles.listBox}
      data-isrow={isRow}
      onClick={onClick}
      variants={isAnimate ? childMotion : {}}
    >
      {children}
    </motion.button>
  );
}

interface DetectAnimationProps {
  children: ReactNode;
}

/** 자식 애니메이션 컴포넌트 */
export function DetectAnimation({ children }: DetectAnimationProps) {
  return (
    <motion.div
      className={styles.animateBox}
      initial='notClicked'
      animate='clicked'
      exit='notClicked'
      variants={parentsMotion}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedIconSwitcherProps {
  isSaveMode: boolean;
  initIconSrc: string;
  changedIconSrc: string;
  alt: string;
}

/** 아이콘 전환 애니메이션 컴포넌트 */
export function AnimatedIconSwitcher({ isSaveMode, initIconSrc, changedIconSrc, alt }: AnimatedIconSwitcherProps) {
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

interface AnimatedTextSwitcherProps {
  isSaveMode: boolean;
  initText: string;
  changedText: string;
}

/** 글자 전환 애니메이션 컴포넌트 */
export function AnimatedTextSwitcher({ isSaveMode, initText, changedText }: AnimatedTextSwitcherProps) {
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
