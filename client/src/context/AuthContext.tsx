import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { User } from "@shared/schema";

// Mock user data for development purposes
const mockUser: User = {
  id: 1,
  username: "testuser",
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    password: string;
    name: string;
    email: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Create a default value for the context to avoid undefined errors
const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  checkAuth: async () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser); // Using mock user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Set to true for development
  const [isLoading, setIsLoading] = useState<boolean>(false); // Set to false to avoid loading state

  const checkAuth = useCallback(async () => {
    // For now, just use the mock user data
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username: string, password: string) => {
    // Simulate successful login
    setUser(mockUser);
    setIsAuthenticated(true);
    return { user: mockUser };
  };

  const register = async (userData: {
    username: string;
    password: string;
    name: string;
    email: string;
  }) => {
    // Simulate successful registration
    setUser(mockUser);
    setIsAuthenticated(true);
    return { user: mockUser };
  };

  const logout = async () => {
    // Simulate logout
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
