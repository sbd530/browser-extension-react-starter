import { createRoot } from 'react-dom/client';
import { createShadowRootUi, defineContentScript } from '#imports';
import { watchTheme } from '@/lib/content-theme';
import App from './App';
import './style.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'bers-content-ui',
      position: 'inline',
      anchor: 'body',
      onMount(container) {
        const wrapper = document.createElement('div');
        container.append(wrapper);
        const unwatchTheme = watchTheme(wrapper);
        const root = createRoot(wrapper);
        root.render(<App />);
        return { root, unwatchTheme };
      },
      onRemove(mounted) {
        mounted?.root.unmount();
        mounted?.unwatchTheme();
      },
    });
    ui.mount();
  },
});
