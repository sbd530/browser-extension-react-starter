import { Minus, Plus, RotateCcw } from 'lucide-react';
import { i18n } from '#i18n';
import { counterStorage } from '@/lib/storage';
import { useStorageValue } from '@/hooks/use-storage-value';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function updateCounter(next: number) {
  void counterStorage.setValue(next);
}

export function CounterCard() {
  const count = useStorageValue(counterStorage, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{i18n.t('popup.count')}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <output className="font-mono text-4xl font-semibold tabular-nums">{count}</output>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={() => updateCounter(count - 1)}>
            <Minus />
            <span className="sr-only">{i18n.t('popup.count')}</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => updateCounter(count + 1)}>
            <Plus />
            <span className="sr-only">{i18n.t('popup.increment')}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => updateCounter(0)}>
            <RotateCcw />
            <span className="sr-only">{i18n.t('popup.reset')}</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{i18n.t('popup.storageHint')}</p>
      </CardFooter>
    </Card>
  );
}
