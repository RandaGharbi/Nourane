import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
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

  // Vérifier l'état d'authentification au démarrage
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        // Optionnel: vérifier si le token est toujours valide
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      // delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.log('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
