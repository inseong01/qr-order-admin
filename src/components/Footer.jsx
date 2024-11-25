import styles from '@/style/Footer.module.css';
import FooterList from './FooterList';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FooterList />
    </footer>
  );
}
