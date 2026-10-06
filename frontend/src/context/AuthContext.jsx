import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ems_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ems_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('ems_token');
      if (storedToken) {
        try {
          const res = await authService.getMe();
          setUser(res.data.user);
          localStorage.setItem('ems_user', JSON.stringify(res.data.user));
        } catch {
          // Token invalid or expired
          localStorage.removeItem('ems_token');
          localStorage.removeItem('ems_user');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    const { user: loggedInUser, token: authToken } = res.data;
    localStorage.setItem('ems_token', authToken);
    localStorage.setItem('ems_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setToken(authToken);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    const { user: registeredUser, token: authToken } = res.data;
    localStorage.setItem('ems_token', authToken);
    localStorage.setItem('ems_user', JSON.stringify(registeredUser));
    setUser(registeredUser);
    setToken(authToken);
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
