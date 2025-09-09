import './index.css';
import './styles/fonts.css';
import RootRouter from './routes';

import { createRoot } from 'react-dom/client';

if (import.meta.env.MODE === 'development') {
  import('react-scan').then(({ scan }) => {
    scan({ enabled: true });
  });
}

createRoot(document.getElementById('root') as HTMLElement).render(<RootRouter />);
