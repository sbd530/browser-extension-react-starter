import { i18n } from '#i18n';
import { showBadgeStorage } from '@/lib/storage';
import { useStorageValue } from '@/hooks/use-storage-value';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function NotificationToggle() {
  const enabled = useStorageValue(showBadgeStorage, true);

  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="show-badge">{i18n.t('options.notifications')}</Label>
      <Switch
        id="show-badge"
        checked={enabled}
        onCheckedChange={(value) => void showBadgeStorage.setValue(value)}
      />
    </div>
  );
}
