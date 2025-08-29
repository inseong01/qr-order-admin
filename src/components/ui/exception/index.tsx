import { ReactNode } from 'react';
import { motion } from 'motion/react';

import styles from './index.module.css';

type ExceptionTextProps = {
  text: string;
};

export function ExceptionText({ text }: ExceptionTextProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.title}>
      {text}
    </motion.div>
  );
}

type FormInputBoxProps = {
  children: ReactNode;
  htmlFor?: string;
};

// FormInputBox
export function FormInputBox({ children, htmlFor }: FormInputBoxProps) {
  return (
    <label className={styles.inputBox} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

type InputCaptionProps = {
  text: string;
  hasError: boolean;
  align?: string;
};

// FormInputCaption
export function FormInputCaption({ text, hasError, align }: InputCaptionProps) {
  return (
    hasError && (
      <span className={styles.caption} data-align={align}>
        {text}
      </span>
    )
  );
}
