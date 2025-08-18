import styles from './index.module.css';
import useSuccessRedirect from '../../hooks/use-success-redirect';

type AuthSuccessProps = {
  text: string;
  page: string;
};

export default function AuthSuccess({ text, page }: AuthSuccessProps) {
  // 지연 후 리다이렉트 처리
  useSuccessRedirect();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* 아이콘 */}
        <div className={styles.icon}>✔️</div>

        {/* 내용 */}
        <h1 className={styles.title}>{text} 성공!</h1>
        <p className={styles.message}>잠시 후 {page} 페이지로 이동합니다.</p>
      </div>
    </div>
  );
}
