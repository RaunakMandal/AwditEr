import { createContext, useContext, useState } from 'react';
import { T_User } from './types/user';

const AuthContext = createContext<
  | { user: T_User | null; login: (user: T_User) => void; logout: () => void }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<T_User | null>(null);

  // Function to log in a user
  const login = (loginUser: T_User) => {
    setUser(loginUser);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
