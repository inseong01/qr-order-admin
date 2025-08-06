import './index.css';
import './styles/fonts.css';
import RootRouter from './routes';

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root') as HTMLElement).render(<RootRouter />);
