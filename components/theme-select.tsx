import { i18n } from '#i18n';
import { useTheme } from '@/components/theme-provider';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Theme } from '@/lib/theme';

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="theme">{i18n.t('theme.toggle')}</Label>
      <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
        <SelectTrigger id="theme" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">{i18n.t('theme.light')}</SelectItem>
          <SelectItem value="dark">{i18n.t('theme.dark')}</SelectItem>
          <SelectItem value="system">{i18n.t('theme.system')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
