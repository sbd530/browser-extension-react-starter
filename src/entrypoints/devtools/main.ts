import { i18n } from '#i18n';
import { browser } from '#imports';

// Register a custom panel inside the browser DevTools.
browser.devtools.panels.create(
  i18n.t('devtools.panelTitle'),
  '/icon/128.png',
  '/devtools-panel.html',
);
