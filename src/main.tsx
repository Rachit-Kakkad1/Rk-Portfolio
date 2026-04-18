import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Recover once when a stale HTML shell points to removed hashed chunks after deploy.
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const message = event?.message ?? '';
    const isChunkFetchFailure =
      message.includes('Failed to fetch dynamically imported module') ||
      message.includes('Importing a module script failed');

    if (!isChunkFetchFailure) return;

    const reloadKey = 'chunk-reload-attempted';
    if (sessionStorage.getItem(reloadKey)) return;

    sessionStorage.setItem(reloadKey, '1');
    window.location.reload();
  });

  window.addEventListener('load', () => {
    sessionStorage.removeItem('chunk-reload-attempted');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
