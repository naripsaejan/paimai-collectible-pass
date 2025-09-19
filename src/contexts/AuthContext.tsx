'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, User, Wallet, BitkubWallet } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  thirdwebWallet: Wallet | null;
  bitkubWallet: BitkubWallet | null;
  login: (provider: 'google' | 'line', credentials: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  connectBitkub: (bitkubData: any) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [thirdwebWallet, setThirdwebWallet] = useState<Wallet | null>(null);
  const [bitkubWallet, setBitkubWallet] = useState<BitkubWallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    checkSession();
    
    // Check for OAuth callback success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      const userId = urlParams.get('user_id');
      const userName = urlParams.get('user_name');
      const userEmail = urlParams.get('user_email');
      
      if (userId && userName && userEmail) {
        // Set user data from OAuth callback
        setUser({
          id: userId,
          email: userEmail,
          name: userName,
          provider: 'google',
          provider_id: userId,
          avatar_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
        // Save session
        localStorage.setItem('paimai_session', JSON.stringify({
          userId: userId,
          timestamp: Date.now()
        }));
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const checkSession = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is logged in via localStorage
      const sessionData = localStorage.getItem('paimai_session');
      if (!sessionData) {
        setIsLoading(false);
        return;
      }

      const { userId } = JSON.parse(sessionData);
      
      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError || !userData) {
        localStorage.removeItem('paimai_session');
        setIsLoading(false);
        return;
      }

      setUser(userData);

      // Fetch thirdweb wallet
      const { data: walletData } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .eq('provider', 'thirdweb')
        .single();

      if (walletData) {
        setThirdwebWallet(walletData);
      }

      // Fetch bitkub wallet
      const { data: bitkubData } = await supabase
        .from('bitkub_wallets')
        .select('*')
        .eq('user_id', userId)
        .eq('provider', 'bitkub_next')
        .single();

      if (bitkubData) {
        setBitkubWallet(bitkubData);
      }

    } catch (error) {
      console.error('Session check failed:', error);
      localStorage.removeItem('paimai_session');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (provider: 'google' | 'line', credentials: any) => {
    try {
      setIsLoading(true);

      // Call OAuth API
      const response = await fetch(`/api/auth/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      // Set user data
      setUser(data.user);
      setThirdwebWallet(data.thirdwebWallet);

      // Save session to localStorage
      localStorage.setItem('paimai_session', JSON.stringify({
        userId: data.user.id,
        timestamp: Date.now()
      }));

      return { success: true };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    } finally {
      setIsLoading(false);
    }
  };

  const connectBitkub = async (bitkubData: any) => {
    try {
      if (!user) {
        return { success: false, error: 'User not logged in' };
      }

      setIsLoading(true);

      // Call Bitkub connection API
      const response = await fetch('/api/wallets/bitkub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          bitkubData
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Bitkub connection failed' };
      }

      // Set bitkub wallet data
      setBitkubWallet(data.bitkubWallet);

      return { success: true };

    } catch (error) {
      console.error('Bitkub connection error:', error);
      return { success: false, error: 'Network error' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      await fetch('/api/auth/logout', { method: 'POST' });

      // Clear local state
      setUser(null);
      setThirdwebWallet(null);
      setBitkubWallet(null);

      // Clear session from localStorage
      localStorage.removeItem('paimai_session');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      thirdwebWallet,
      bitkubWallet,
      login,
      logout,
      connectBitkub,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
