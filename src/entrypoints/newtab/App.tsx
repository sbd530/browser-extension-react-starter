import { i18n } from '#i18n';
import { AppHeader } from '@/components/app-header';
import { BersLogo } from '@/components/bers-logo';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
        <BersLogo className="size-24" />
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{i18n.t('newtab.greeting')}</h1>
          <p className="max-w-md text-balance text-muted-foreground">{i18n.t('newtab.tagline')}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
