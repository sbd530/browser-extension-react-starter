import { cn } from '@/lib/utils';

/**
 * BERS wordmark. Uses `currentColor`, so it follows the text color: black on light,
 * white on dark. The letters are condensed to fill a square.
 */
export function BersLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="BERS"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-foreground', className)}
      {...props}
    >
      <text
        x="50"
        y="53"
        textAnchor="middle"
        dominantBaseline="central"
        textLength="86"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="'Geist', system-ui, sans-serif"
        fontWeight="800"
        fontSize="44"
        fill="currentColor"
      >
        BERS
      </text>
    </svg>
  );
}
