import { defineContentScript } from '#imports';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    console.info('[BERS] content script loaded on', location.href);
  },
});
