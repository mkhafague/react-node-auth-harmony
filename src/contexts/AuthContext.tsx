
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our user object
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: () => {},
  logout: () => {},
});

// Custom hook for easier context usage
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage in this demo)
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('adfs_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
        setError('Failed to retrieve authentication status');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // In a real implementation, this would redirect to ADFS
  const login = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate ADFS authentication (in real app, redirect to ADFS)
    setTimeout(() => {
      try {
        // Mock user data (in real app, this would come from ADFS)
        const mockUser: User = {
          id: '12345',
          name: 'John Doe',
          email: 'john.doe@company.com',
          roles: ['User', 'Admin']
        };
        
        setUser(mockUser);
        localStorage.setItem('adfs_user', JSON.stringify(mockUser));
      } catch (err) {
        console.error('Login error:', err);
        setError('Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1500); // Simulate network delay
  };

  const logout = () => {
    // In a real app, this would involve clearing tokens and possibly a redirect
    setUser(null);
    localStorage.removeItem('adfs_user');
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
