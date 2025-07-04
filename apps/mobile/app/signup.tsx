import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const SignupScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signup, isAuthenticated, loading: authLoading } = useAuth();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    setLoading(true);

    const success = await signup(name, email, password);

    setLoading(false);

    if (success) {
      Alert.alert('Succès', 'Compte créé avec succès', [
        {
          text: 'OK',
          onPress: () => router.replace('/login')
        }
      ]);
    }
  };

  // Afficher un loader pendant la vérification de l'état d'authentification
  if (authLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F5A623" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si déjà connecté, ne pas afficher l'écran de signup
  if (isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeIcon} onPress={() => router.back()}>
        <Text style={{ fontSize: 22 }}>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create your account</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.signupBtn, loading && { opacity: 0.7 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupText}>Sign up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginLink}>
          Already have an account? <Text style={{ textDecorationLine: 'underline' }}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
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
  closeIcon: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 60, marginBottom: 24 },
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
    marginTop: 24,
    alignItems: 'center',
  },
  signupText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loginLink: {
    color: '#6B4F2B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SignupScreen;
