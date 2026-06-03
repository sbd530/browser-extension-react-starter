import { i18n } from '#i18n';
import { AppHeader } from '@/components/app-header';
import { CounterCard } from '@/components/counter-card';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 space-y-4 p-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">{i18n.t('sidepanel.title')}</h1>
          <p className="text-sm text-muted-foreground">{i18n.t('sidepanel.description')}</p>
        </div>
        <CounterCard />
      </main>
    </div>
  );
}

export default App;
