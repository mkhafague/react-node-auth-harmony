
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our user object
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  tokenExpiration?: number;
}

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  getAuthenticatedState: () => boolean;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: () => {},
  logout: () => {},
  getAuthenticatedState: () => false,
});

// Custom hook for easier context usage
export const useAuth = () => useContext(AuthContext);

// Token storage key
const TOKEN_STORAGE_KEY = 'adfs_token';
const USER_STORAGE_KEY = 'adfs_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Parse and validate the token from storage
  const parseStoredToken = (): string | null => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!token) return null;
      
      // In a real implementation, you would validate the token here
      // For example, check if it's expired
      return token;
    } catch (err) {
      console.error('Error parsing token:', err);
      return null;
    }
  };

  // Load user from storage
  const loadUserFromStorage = (): User | null => {
    try {
      const userStr = localStorage.getItem(USER_STORAGE_KEY);
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (err) {
      console.error('Error loading user from storage:', err);
      return null;
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = parseStoredToken();
        const storedUser = loadUserFromStorage();
        
        if (token && storedUser) {
          // In a real implementation, you would validate the token here
          // and possibly refresh it if it's about to expire
          setUser(storedUser);
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

  // Helper to get authenticated state (useful for components that don't need the user object)
  const getAuthenticatedState = (): boolean => {
    return !!parseStoredToken() && !!loadUserFromStorage();
  };

  // In a real implementation, this would redirect to ADFS
  const login = () => {
    setIsLoading(true);
    setError(null);
    
    // In production, this would redirect to ADFS login page
    const adfsUrl = process.env.REACT_APP_ADFS_URL || 'https://adfs.yourdomain.com/adfs';
    const clientId = process.env.REACT_APP_CLIENT_ID || 'your-client-id';
    const redirectUri = encodeURIComponent(window.location.origin + '/dashboard');
    
    // For demonstration, we'll simulate ADFS authentication
    // In a real implementation, this would be:
    // window.location.href = `${adfsUrl}/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query`;
    
    // Simulation for demo purposes only
    setTimeout(() => {
      try {
        // Mock user data and token (in real app, this would come from ADFS)
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obi5kb2VAY29tcGFueS5jb20iLCJyb2xlcyI6WyJVc2VyIiwiQWRtaW4iXSwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const mockUser: User = {
          id: '12345',
          name: 'John Doe',
          email: 'john.doe@company.com',
          roles: ['User', 'Admin'],
          tokenExpiration: Date.now() + 3600000 // 1 hour from now
        };
        
        localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
      } catch (err) {
        console.error('Login error:', err);
        setError('Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1500); // Simulate network delay
  };

  const logout = () => {
    // In a real ADFS implementation, you might need to call a logout endpoint
    // const adfsUrl = process.env.REACT_APP_ADFS_URL || 'https://adfs.yourdomain.com/adfs';
    // window.location.href = `${adfsUrl}/ls/?wa=wsignout1.0`;
    
    // Clear local storage
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    getAuthenticatedState,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
