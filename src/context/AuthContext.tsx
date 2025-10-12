import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  addresses: Array<{
    id: string;
    type: 'home' | 'work' | 'other';
    address: string;
    landmark?: string;
  }>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<{ isAdmin: boolean }>;
  logout: () => void;
  loginAsAdmin: () => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isAdmin: false
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for admin credentials
    if (email === 'admin@jainshikanji.com' && password === 'admin123') {
      setAuthState({
        user: {
          id: 'admin',
          name: 'Store Manager',
          email: 'admin@jainshikanji.com',
          phone: '+91 9999999999',
          loyaltyPoints: 0,
          tier: 'Platinum',
          addresses: []
        },
        isAuthenticated: true,
        isAdmin: true
      });
      return { isAdmin: true };
    }
    
    // Regular customer login
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'Arjun Patel',
        email: email,
        phone: '+91 9876543210',
        loyaltyPoints: 450,
        tier: 'Gold',
        addresses: [
          {
            id: '1',
            type: 'home',
            address: '123 MG Road, Bangalore, Karnataka 560001',
            landmark: 'Near Metro Station'
          }
        ]
      };

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isAdmin: false
      });
      return { isAdmin: false };
    }
    
    // Invalid credentials
    throw new Error('Invalid credentials');
  };

  const loginAsAdmin = () => {
    setAuthState({
      user: {
        id: 'admin',
        name: 'Restaurant Manager',
        email: 'admin@spiceroute.com',
        phone: '+91 9999999999',
        loyaltyPoints: 0,
        tier: 'Platinum',
        addresses: []
      },
      isAuthenticated: true,
      isAdmin: true
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isAdmin: false
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, loginAsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};