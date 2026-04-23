import { cn } from '../../utils/cn';

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] sm:h-11 sm:text-sm',
        className,
      )}
      {...props}
    />
  );
}
