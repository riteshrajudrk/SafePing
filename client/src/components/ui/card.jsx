import { cn } from '../../utils/cn';

export function Card({ className, ...props }) {
  return <div className={cn('glass-panel rounded-[1.7rem] p-4 sm:rounded-3xl sm:p-5', className)} {...props} />;
}
