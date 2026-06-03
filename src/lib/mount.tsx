import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/tailwind.css';
import { Providers } from '@/components/providers';

/** Mounts a page entrypoint (popup, options, side panel, new tab, devtools panel). */
export function mountApp(App: React.ComponentType) {
  const root = document.getElementById('root');
  if (!root) return;
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>,
  );
}
