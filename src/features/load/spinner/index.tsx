import styles from './index.module.css';

type LoadingSpinnerProps = {
  position?: 'fixed' | 'absolute';
};

export default function LoadingSpinner({ position = 'fixed' }: LoadingSpinnerProps) {
  return (
    <li className={styles.loaderBox} aria-busy={true} data-position={position}>
      <div className={styles.loader}></div>
    </li>
  );
}
