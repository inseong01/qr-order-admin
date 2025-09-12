import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';
import styles from './index.module.css';

type MenuModalHeaderProps = {
  title: string;
  onClose: () => void;
};

export function MenuModalHeader({ title, onClose }: MenuModalHeaderProps) {
  return (
    <div className={styles.header}>
      {/* 제목 */}
      <h2 className={styles.modalTitle}>{title}</h2>

      {/* 닫기 */}
      <button type='button' className={styles.close} onClick={onClose}>
        <img src={LIGHT_PLUS_ICON} alt='닫기' />
      </button>
    </div>
  );
}
