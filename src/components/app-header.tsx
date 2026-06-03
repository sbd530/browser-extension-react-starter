import { BersLogo } from '@/components/bers-logo';
import { ModeToggle } from '@/components/mode-toggle';

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b px-4 py-3">
      <BersLogo className="size-8" />
      <ModeToggle />
    </header>
  );
}
