import styles from './index.module.css';

type CaptionProps = {
  text: string;
};

export default function Caption({ text }: CaptionProps) {
  return <span className={styles.caption}>{text}</span>;
}
