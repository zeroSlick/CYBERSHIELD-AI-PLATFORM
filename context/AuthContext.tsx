
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { supabase } from '../supabaseClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const profile = session.user;
        setUser({
          id: profile.id,
          username: profile.user_metadata?.username || profile.email?.split('@')[0] || 'operator',
          email: profile.email || '',
          role: (profile.user_metadata?.role as UserRole) || UserRole.SOC,
          isActive: true,
          lastLogin: new Date().toISOString()
        });
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const profile = session.user;
        setUser({
          id: profile.id,
          username: profile.user_metadata?.username || profile.email?.split('@')[0] || 'operator',
          email: profile.email || '',
          role: (profile.user_metadata?.role as UserRole) || UserRole.SOC,
          isActive: true,
          lastLogin: new Date().toISOString()
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          username: userData.username,
          department: userData.department,
          role: userData.role // This is the UserRole (SOC, DFIR, etc)
        }
      }
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
