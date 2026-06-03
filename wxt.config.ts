import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react', '@wxt-dev/i18n/module'],
  // Explicit imports everywhere (no directory auto-imports). Import WXT APIs from '#imports'.
  imports: false,
  manifest: ({ browser }) => ({
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    default_locale: 'en',
    permissions: [
      'storage',
      'activeTab',
      'scripting',
      ...(browser === 'firefox' ? [] : ['sidePanel']),
    ],
    ...(browser === 'firefox'
      ? {
          browser_specific_settings: {
            gecko: {
              id: 'browser-extension-react-starter@example.com',
              strict_min_version: '109.0',
            },
          },
          sidebar_action: {
            default_title: 'BERS',
            default_panel: 'sidepanel.html',
            default_icon: { 48: 'icon/48.png', 128: 'icon/128.png' },
          },
        }
      : {}),
  }),
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
