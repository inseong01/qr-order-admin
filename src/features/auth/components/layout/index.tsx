import { NavLink } from 'react-router';

import styles from './index.module.css';
import useNavPage from '../../hooks/use-nav-page';
import { ReactNode } from 'react';

type AuthFormTitleProps = {
  text: string;
};

// AuthFormTitle
export function AuthFormTitle({ text }: AuthFormTitleProps) {
  return <h1 className={styles.title}>{text}</h1>;
}

type AuthNavLinkProps = {
  text: string;
  to: string;
};

// AuthNavLink
export function AuthNavLink({ text, to }: AuthNavLinkProps) {
  const { handleNav, disabled } = useNavPage();

  return (
    <NavLink to={to} className={styles.link} onClick={handleNav} aria-disabled={disabled} data-disabled={disabled}>
      {text}
    </NavLink>
  );
}

type InputCaptionProps = {
  text: string;
  hasError: boolean;
};

// InputCaption
export function InputCaption({ text, hasError }: InputCaptionProps) {
  return hasError && <span className={styles.caption}>{text}</span>;
}

type AuthFormSubmitButtonProps = {
  text: string;
  disabled: boolean;
};

// AuthFormSubmitButton
export function AuthFormSubmitButton({ text, disabled }: AuthFormSubmitButtonProps) {
  return (
    <button type='submit' className={styles.button} disabled={disabled}>
      {text}
    </button>
  );
}

type AuthFormProps = {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

// AuthForm
export function AuthForm({ children, onSubmit }: AuthFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

type AuthFormInputBoxProps = {
  children: ReactNode;
};

// AuthFormInputBox
export function AuthFormInputBox({ children }: AuthFormInputBoxProps) {
  return <div className={styles.inputBox}>{children}</div>;
}
