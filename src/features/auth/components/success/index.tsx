import styles from './index.module.css';
import useSuccessRedirect from '../../hooks/use-success-redirect';

type AuthSuccessProps = {
  feature: string;
  movePage: string;
};

export default function AuthSuccess({ feature, movePage }: AuthSuccessProps) {
  // 지연 후 리다이렉트 처리
  useSuccessRedirect();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* 아이콘 */}
        <div className={styles.icon}>✔️</div>

        {/* 내용 */}
        <h1 className={styles.title}>{feature} 성공!</h1>
        <p className={styles.message}>잠시 후 {movePage} 페이지로 이동합니다.</p>
      </div>
    </div>
  );
}
