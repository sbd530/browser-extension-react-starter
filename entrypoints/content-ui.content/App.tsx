import { useState } from 'react';
import { X } from 'lucide-react';
import { i18n } from '#i18n';
import { BersLogo } from '@/components/bers-logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function App() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed right-4 bottom-4 z-[2147483647] flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-lg">
      <BersLogo className="size-5" />
      <Badge variant="secondary">{i18n.t('content.badge')}</Badge>
      <Button variant="ghost" size="icon" className="size-6" onClick={() => setOpen(false)}>
        <X className="size-3.5" />
        <span className="sr-only">{i18n.t('content.dismiss')}</span>
      </Button>
    </div>
  );
}

export default App;
