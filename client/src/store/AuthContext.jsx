import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('safeping_token');

    if (!token) {
      setIsLoading(false);
      return;
    }

    authService
      .me()
      .then((response) => setUser(response.user))
      .catch(() => {
        localStorage.removeItem('safeping_token');
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const persistAuth = (data) => {
    localStorage.setItem('safeping_token', data.token);
    setUser(data.user);
  };

  const login = async (payload) => {
    const data = await authService.login(payload);
    persistAuth(data);
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    persistAuth(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('safeping_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
