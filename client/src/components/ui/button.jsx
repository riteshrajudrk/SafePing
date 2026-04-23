import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[hsl(var(--primary))] px-4 py-2 text-[hsl(var(--primary-foreground))] shadow-lg shadow-cyan-500/20 hover:translate-y-[-1px]',
        secondary: 'bg-[hsl(var(--secondary))] px-4 py-2 text-[hsl(var(--secondary-foreground))]',
        ghost: 'border border-white/10 bg-white/5 px-4 py-2 text-[hsl(var(--foreground))] hover:bg-white/10',
        destructive: 'bg-rose-500 px-4 py-2 text-white hover:bg-rose-600',
      },
      size: {
        default: 'min-h-11',
        sm: 'h-9 px-3 text-xs',
        lg: 'min-h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ className, variant, size }))} {...props} />;
}

export { buttonVariants };
