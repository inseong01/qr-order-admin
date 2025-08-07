import { NavLink } from 'react-router';

import { PATHS } from '@/constants/paths';

import useNavPage from '../hooks/use-nav-page';
import AuthContainer from '../components/container';
import SignUpForm from './components/form';
import styles from './index.module.css';

export default function SignUpPage() {
  const { handleNav, disabled } = useNavPage();

  return (
    <AuthContainer>
      {/* 상단 */}
      <h1 className={styles.title}>회원가입</h1>

      {/* 중간 */}
      <SignUpForm />

      {/* 하단 */}
      <nav>
        <NavLink
          to={PATHS.AUTH.LOGIN}
          className={styles.link}
          onClick={handleNav}
          aria-disabled={disabled}
          data-disabled={disabled}
        >
          돌아가기
        </NavLink>
      </nav>
    </AuthContainer>
  );
}
