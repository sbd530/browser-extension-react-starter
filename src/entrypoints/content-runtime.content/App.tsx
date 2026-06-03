import { useState } from 'react';
import { X } from 'lucide-react';
import { i18n } from '#i18n';
import { BersLogo } from '@/components/bers-logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function App() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed top-4 left-1/2 z-[2147483647] -translate-x-1/2">
      <Card className="flex flex-row items-center gap-3 px-4 py-3 shadow-xl">
        <BersLogo className="size-6" />
        <span className="text-sm font-medium">{i18n.t('content.badge')}</span>
        <Button variant="ghost" size="icon" className="size-6" onClick={() => setOpen(false)}>
          <X className="size-3.5" />
          <span className="sr-only">{i18n.t('content.dismiss')}</span>
        </Button>
      </Card>
    </div>
  );
}

export default App;
