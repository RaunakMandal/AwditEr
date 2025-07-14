import { createContext, useContext, useEffect, useState } from 'react';
import { T_User } from './types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA_ASYNC_KEY } from './utils/constants';

const UserContext = createContext<
  | { user: T_User | null; login: (user: T_User) => void; logout: () => void }
  | undefined
>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<T_User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem(USER_DATA_ASYNC_KEY);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const login = async (loginUser: T_User) => {
    setUser(loginUser);
    await AsyncStorage.setItem(USER_DATA_ASYNC_KEY, JSON.stringify(loginUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_DATA_ASYNC_KEY);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used inside UserProvider');
  return ctx;
};
