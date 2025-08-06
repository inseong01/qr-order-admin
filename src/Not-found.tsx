import { NavLink } from 'react-router';
import styles from './styles/Not-found.module.css';
import { PATHS } from './constants/paths';

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>페이지를 찾을 수 없습니다.</p>

      <NavLink to={PATHS.ROOT} className={styles.homeLink}>
        홈으로 돌아가기
      </NavLink>
    </div>
  );
}

export default NotFound;
