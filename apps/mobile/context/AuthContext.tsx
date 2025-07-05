import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ⚠️ Remplace par ton IP locale du backend
const API_BASE_URL = 'http://localhost:5000';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  console.log('user', user);
  // Vérifier l'état d'authentification au démarrage
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('TOKEN:', token);

      if (token) {
        setIsAuthenticated(true);
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('REPONSE /me:', res.data);
        setUser(res.data.user);
      }
    } catch (error) {
      console.log('Erreur lors de la vérification du token:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      
      // Sauvegarder le token
      if (res.data.token) {
        await AsyncStorage.setItem('authToken', res.data.token);
        // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      
      setUser(res.data.user);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      Alert.alert('Erreur', err.response?.data?.message || 'Erreur serveur');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      console.log('Tentative de signup vers:', `${API_BASE_URL}/api/auth/signup`);
      await axios.post(`${API_BASE_URL}/api/auth/signup`, { name, email, password });
      console.log('Signup réussi');
      return true;
    } catch (err: any) {
      console.log('Erreur signup:', err.message);
      Alert.alert('Erreur', err.response?.data?.message || 'Erreur serveur');
      return false;
    }
  };

  const logout = async () => {
    try {
      // Appel au backend pour logout (optionnel mais propre)
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      // delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.log('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
