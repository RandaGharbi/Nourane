import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import SocialButton from "../components/SocialButton";

import appleIcon from "../assets/images/apple.png";
import googleIcon from "../assets/images/gmail.png";
import emailIcon from "../assets/images/email.png";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/');
    }
  }, [loading, isAuthenticated, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    setIsLoggingIn(true);
    const ok = await login(email, password);
    setIsLoggingIn(false);
    
    if (ok) {
      router.replace('/');
    }
  };

  // Afficher un loader pendant la vérification de l'état d'authentification
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F5A623" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si déjà connecté, ne pas afficher l'écran de login
  if (isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Help Icon */}
      <TouchableOpacity style={styles.helpIcon}>
        <Text style={{ fontSize: 18 }}>?</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome back</Text>

      <Text style={styles.subtitle}>
        Sign in to access your account and continue your journey with Nourane.
      </Text>

      <View style={styles.buttonContainer}>
        <SocialButton
          icon={appleIcon}
          text="Continue with Apple"
          onPress={() => {}}
        />
        <SocialButton
          icon={googleIcon}
          text="Continue with Google"
          onPress={() => {}}
        />
        <SocialButton
          icon={emailIcon}
          text="Sign in with email"
          onPress={() => setShowEmailForm((v) => !v)}
          style={styles.emailButton}
          textStyle={{ color: "#fff" }}
        />
      </View>

      {showEmailForm && (
        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter youremail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter yourpassword"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity 
            style={[styles.signupBtn, isLoggingIn && { opacity: 0.7 }]} 
            onPress={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupText}>Log in</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
  },
  backText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  helpIcon: { position: "absolute", top: 20, right: 20, zIndex: 1 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
  },
  subtitle: {
    textAlign: "center",
    color: "#444",
    marginTop: 12,
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 32,
  },
  emailButton: {
    backgroundColor: "#F5A623",
  },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#F6F3F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 15,
  },
  signupBtn: {
    backgroundColor: '#F5A623',
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    alignItems: 'center',
  },
  signupContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  signupText: {
    color: "#888",
    fontSize: 14,
  },
});

export default LoginScreen;