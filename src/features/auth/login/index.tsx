import { NavLink } from 'react-router';

import { PATHS } from '@/constants/paths';

import AuthContainer from '../components/container';
import useNavPage from '../hooks/use-nav-page';
import LoginForm from './components/form';
import styles from './index.module.css';

/**
 * 로그인 페이지 전체 UI
 */
export default function LoginPage() {
  const { handleNav } = useNavPage();

  return (
    <AuthContainer>
      {/* 상단 */}
      <h1 className={styles.title}>로그인</h1>

      {/* 중간 */}
      <LoginForm />

      {/* 하단 */}
      <nav className={styles.actions}>
        <NavLink to={PATHS.AUTH.SIGNUP} className={styles.link} onClick={handleNav}>
          회원가입
        </NavLink>

        <NavLink to={PATHS.AUTH.FIND.PASSWORD} className={styles.link} onClick={handleNav}>
          비밀번호 찾기
        </NavLink>
      </nav>
    </AuthContainer>
  );
}
