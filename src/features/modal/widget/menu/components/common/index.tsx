import { FormEvent, ReactNode } from 'react';

import styles from './index.module.css';

type SubmitInfoBoxProps = {
  children: ReactNode;
};

export function SubmitInfoBox({ children }: SubmitInfoBoxProps) {
  return <ul className={styles.submitInfo}>{children}</ul>;
}

type TitleBoxProps = {
  children: ReactNode;
};

export function TitleBox({ children }: TitleBoxProps) {
  return (
    <div className={styles.title}>
      <span>{children}</span>
    </div>
  );
}

type SubmitFormBoxProps = {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function SubmitFormBox({ children, onSubmit }: SubmitFormBoxProps) {
  return (
    <form className={styles.submitForm} onSubmit={onSubmit}>
      <div className={styles.sortModal}>{children}</div>
    </form>
  );
}
