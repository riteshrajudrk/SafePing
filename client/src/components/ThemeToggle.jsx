import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../hooks/useTheme';

function ThemeToggle({ forceLabel = false }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button type="button" variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <Sun className={forceLabel ? 'mr-2 h-4 w-4' : 'h-4 w-4 sm:mr-2'} />
      ) : (
        <Moon className={forceLabel ? 'mr-2 h-4 w-4' : 'h-4 w-4 sm:mr-2'} />
      )}
      <span className={forceLabel ? 'inline' : 'hidden sm:inline'}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </Button>
  );
}

export default ThemeToggle;
