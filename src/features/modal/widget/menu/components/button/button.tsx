import styles from './button.module.css';

type SubmitButtonProps = {
  value: '추가하기' | '수정하기' | '삭제하기';
};

export default function SubmitButton({ value }: SubmitButtonProps) {
  const name = value === '삭제하기' ? 'delete' : value === '수정하기' ? 'update' : 'create';
  const isDelete = value === '삭제하기';

  return (
    <div className={styles.submitBtn}>
      <input type='submit' className={`${styles.btn} ${isDelete ? styles.delete : ''}`} name={name} value={value} />
    </div>
  );
}
