import { ReactNode } from 'react';
import { NavLink } from 'react-router';

import styles from './index.module.css';
import useNavPage from '../../hooks/use-nav-page';
import useDisabledState from '../../hooks/use-disabled';

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
  const { handleNav } = useNavPage();
  const { disabled } = useDisabledState();

  return (
    <NavLink to={to} className={styles.link} onClick={handleNav} aria-disabled={disabled} data-disabled={disabled}>
      {text}
    </NavLink>
  );
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
  hasLink: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

// AuthForm
export function AuthForm({ children, hasLink, onSubmit }: AuthFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit} data-has-link={hasLink}>
      {children}
    </form>
  );
}
