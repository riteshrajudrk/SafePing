import { Outlet, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Shield } from 'lucide-react';
import Sidebar, { MobileMenu } from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { useAuth } from '../store/AuthContext';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen px-3 py-3 sm:px-4 lg:p-6">
      <div className="grid min-h-[calc(100vh-2rem)] gap-4 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="space-y-4">
          <header className="glass-panel sticky top-3 z-40 flex items-center justify-between gap-3 rounded-[1.7rem] p-4 lg:static lg:rounded-3xl lg:p-5">
            <div className="min-w-0">
              <div className="hidden items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))] sm:inline-flex sm:text-xs">
                <Shield className="mr-2 h-3.5 w-3.5 text-cyan-300" />
                Safe arrival dashboard
              </div>
              <h1 className="mt-2 truncate text-xl font-semibold sm:text-2xl">{user?.name || 'Safe traveler'}</h1>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
                <Bell className="h-4 w-4 text-cyan-300" />
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{user?.email}</span>
              </div>
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <Button className="hidden sm:inline-flex" variant="ghost" size="sm" onClick={handleLogout} aria-label="Logout">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
              <MobileMenu onLogout={handleLogout} />
            </div>
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
