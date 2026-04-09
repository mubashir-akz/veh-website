import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem('veh_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any email/password
    const userData = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    
    setUser(userData);
    localStorage.setItem('veh_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (email, password, name) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: '1',
      email,
      name,
    };
    
    setUser(userData);
    localStorage.setItem('veh_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('veh_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
