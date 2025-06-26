import styles from './index.module.css';

export default function TextBox({ text }: { text: string }) {
  return <span className={styles.textBox}>{text}</span>;
}
