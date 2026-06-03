import { ExternalLink, MousePointerClick, PanelRight } from 'lucide-react';
import { i18n } from '#i18n';
import { browser } from '#imports';
import { AppHeader } from '@/components/app-header';
import { CounterCard } from '@/components/counter-card';
import { Button } from '@/components/ui/button';

type SidePanelCapable = {
  sidePanel?: { open(options: { windowId: number }): Promise<void> };
  sidebarAction?: { toggle(): Promise<void> };
};

async function openSidePanel() {
  const win = await browser.windows.getCurrent();
  if (win.id == null) return;
  const api = browser as unknown as SidePanelCapable;
  if (api.sidePanel) {
    await api.sidePanel.open({ windowId: win.id });
    window.close();
  } else if (api.sidebarAction) {
    await api.sidebarAction.toggle();
  }
}

async function injectContentUi() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (tab?.id == null) return;
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/content-scripts/content-runtime.js'],
  });
  window.close();
}

function App() {
  return (
    <div className="w-[360px]">
      <AppHeader />
      <main className="space-y-4 p-4">
        <p className="text-sm text-muted-foreground">{i18n.t('popup.description')}</p>
        <CounterCard />
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => void browser.runtime.openOptionsPage()}>
            <ExternalLink />
            {i18n.t('popup.openOptions')}
          </Button>
          <Button variant="outline" onClick={() => void openSidePanel()}>
            <PanelRight />
            {i18n.t('popup.openSidePanel')}
          </Button>
        </div>
        <Button variant="outline" className="w-full" onClick={() => void injectContentUi()}>
          <MousePointerClick />
          {i18n.t('popup.injectUi')}
        </Button>
      </main>
    </div>
  );
}

export default App;
