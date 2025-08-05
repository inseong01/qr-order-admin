import { NavLink } from 'react-router';

import useNavPage from '../hooks/use-nav-page';
import AuthContainer from '../components/container';
import FindPasswordForm from './components/form';
import styles from './index.module.css';

export default function FindPasswordPage() {
  const { handleNav } = useNavPage();

  return (
    <AuthContainer>
      {/* 상단 */}
      <h1 className={styles.title}>비밀번호 찾기</h1>

      {/* 중간 */}
      <FindPasswordForm />

      {/* 하단 */}
      <nav className={styles.actions}>
        <NavLink to={'/'} className={styles.link} onClick={handleNav}>
          로그인
        </NavLink>
      </nav>
    </AuthContainer>
  );
}
