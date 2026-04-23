import { cn } from '../../utils/cn';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]',
        className,
      )}
      {...props}
    />
  );
}
