import { i18n } from '#i18n';
import { browser } from '#imports';
import { AppHeader } from '@/components/app-header';
import { NotificationToggle } from '@/components/notification-toggle';
import { ThemeSelect } from '@/components/theme-select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function App() {
  const manifest = browser.runtime.getManifest();

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{i18n.t('options.title')}</h1>
          <p className="text-muted-foreground">{i18n.t('options.description')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('options.appearance')}</CardTitle>
            <CardDescription>{i18n.t('options.appearanceDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeSelect />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('options.notifications')}</CardTitle>
            <CardDescription>{i18n.t('options.notificationsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationToggle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('options.about')}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{i18n.t('common.fullName')}</span>
            <span className="font-mono">
              {i18n.t('options.version')} {manifest.version}
            </span>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default App;
