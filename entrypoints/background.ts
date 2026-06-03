import { defineBackground, browser } from '#imports';
import { counterStorage, showBadgeStorage } from '@/lib/storage';

export default defineBackground(() => {
  // Mirror the shared counter on the toolbar badge when the badge is enabled.
  async function syncBadge() {
    const [show, count] = await Promise.all([
      showBadgeStorage.getValue(),
      counterStorage.getValue(),
    ]);
    await Promise.all([
      browser.action.setBadgeBackgroundColor({ color: '#09090b' }),
      browser.action.setBadgeText({ text: show && count !== 0 ? String(count) : '' }),
    ]);
  }

  void syncBadge();
  showBadgeStorage.watch(() => void syncBadge());
  counterStorage.watch(() => void syncBadge());
});
