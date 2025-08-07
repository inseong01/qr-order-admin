import { NavLink } from 'react-router';

import { PATHS } from '@/constants/paths';

import useNavPage from '../hooks/use-nav-page';
import AuthContainer from '../components/container';
import FindPasswordForm from './components/form';
import styles from './index.module.css';

export default function FindPasswordPage() {
  const { handleNav, disabled } = useNavPage();

  return (
    <AuthContainer>
      {/* 상단 */}
      <h1 className={styles.title}>비밀번호 찾기</h1>

      {/* 중간 */}
      <FindPasswordForm />

      {/* 하단 */}
      <nav className={styles.actions}>
        <NavLink
          to={PATHS.AUTH.LOGIN}
          className={styles.link}
          onClick={handleNav}
          aria-disabled={disabled}
          data-disabled={disabled}
        >
          로그인
        </NavLink>
      </nav>
    </AuthContainer>
  );
}
