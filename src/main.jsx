import './index.css';
import App from './App.jsx';
import StoreProvider from './StoreProvider';

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
