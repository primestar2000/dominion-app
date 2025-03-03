import useOnBoarded from '@/hooks/useOnboarded';
import { router } from 'expo-router';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Define the shape of your auth context
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  isOnboarded: boolean;
}

// Define user type
interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  isOnboarded: false,
});

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  // const [isOnboarded, setisOnboarded] = useState(false);

  const {isOnboarded, setIsOnboarded} = useOnBoarded();
  useEffect(()=>{
    console.log(isAuthenticated);
    if (!isOnboarded) {
      router.replace("/(onboarding)")
    }else{
      router.replace("/(authentication)/sign-in")
    }
  },[isAuthenticated])
  const signIn = async (email: string, password: string) => {
    try {

      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Implement your sign out logic here
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Implement your sign up logic here
      // Example:
      // const response = await api.signUp(email, password);
      // setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    user,
    signIn,
    signOut,
    signUp,
    isOnboarded,
    setIsOnboarded
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};