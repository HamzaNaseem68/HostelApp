import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profileImage: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('user');
        if (saved) setUser(JSON.parse(saved));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const updateUser = async (updates) => {
    const newUser = { ...user, ...updates };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const logoutUser = async () => {
    setUser({ name: '', email: '', profileImage: '' });
    await AsyncStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 