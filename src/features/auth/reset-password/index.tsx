import AuthContainer from '../components/container';
import ResetPasswordForm from './components/form';
import styles from './index.module.css';

export default function ResetPasswordPage() {
  return (
    <AuthContainer>
      {/* 상단 */}
      <h1 className={styles.title}>비밀번호 수정</h1>

      {/* 중간 */}
      <ResetPasswordForm />
    </AuthContainer>
  );
}
