import styles from './index.module.css';

export default function Tab({
  text,
  isSelected,
  handleTabClick,
}: {
  text: string;
  isSelected: boolean;
  handleTabClick: () => void;
}) {
  return (
    <div className={styles.list} data-selected={isSelected} onClick={handleTabClick}>
      {text}
    </div>
  );
}
