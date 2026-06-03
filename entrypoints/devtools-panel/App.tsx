import { i18n } from '#i18n';
import { CounterCard } from '@/components/counter-card';

function App() {
  return (
    <div className="min-h-screen space-y-4 p-4">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">{i18n.t('devtools.heading')}</h1>
        <p className="text-sm text-muted-foreground">{i18n.t('devtools.description')}</p>
      </div>
      <CounterCard />
    </div>
  );
}

export default App;
