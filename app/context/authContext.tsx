import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define types for user data
interface User {
  user_role: string;
  // id: string;
  // email: string;
  // name?: string;
  // login_id: string;
  // Add other user properties as needed
}

// Define types for props and context value
interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoaded: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Helper function to safely access localStorage
const getStoredUser = (): User | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user_Role");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

// AuthProvider component to wrap around the application
export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Derived state: user is logged in if user object exists
  const isLoggedIn = user !== null;

  // Initialize user data from localStorage after component mounts (client-side only)
  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setIsLoaded(true);
  }, []);

  // Login function to set user data and store in localStorage
  const login = (userData: User) => {
    setUser(userData);

    if (typeof window !== "undefined") {
      localStorage.setItem("user_Role", JSON.stringify(userData));
    }
  };

  // Logout function to clear user data and localStorage
  const logout = () => {
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("user_Role");
    }
  };

  const contextValue: AuthContextValue = {
    user,
    isLoggedIn,
    isLoaded,
    setUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useUser = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};

// Additional custom hooks for convenience
export const useAuth = (): AuthContextValue => {
  return useUser();
};

// Hook to check if user is authenticated
export const useIsAuthenticated = (): boolean => {
  const { isLoggedIn } = useUser();
  return isLoggedIn;
};
