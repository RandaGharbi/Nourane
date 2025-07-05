import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

import BackIcon from '../../assets/images/back.png';
import ChevronIcon from '../../assets/images/chevron.png';
import AvatarImage from '../../assets/images/avatar.png';
import LogoutIcon from '../../assets/images/logout.png';

export default function ProfileScreen() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  const handleNavigation = (screen: string) => {
    router.push(`/${screen}` as any);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>Profile</Text>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Image source={LogoutIcon} style={styles.logoutIcon} />
        </Pressable>
      </View>

      <Image source={AvatarImage} style={styles.avatar} />
      <Text style={styles.name}>{user?.name || "Nom inconnu"}</Text>
      <Text style={styles.email}>{user?.email || "Email inconnu"}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <Pressable style={styles.item} onPress={() => handleNavigation('personal-info')}>
          <Text style={styles.itemText}>Personal Information</Text>
          <Image source={ChevronIcon} style={styles.chevron} />
        </Pressable>

        <Pressable style={styles.item} onPress={() => handleNavigation('payment-methods')}>
          <Text style={styles.itemText}>Payment Methods</Text>
          <Image source={ChevronIcon} style={styles.chevron} />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Orders</Text>

        <Pressable style={styles.item} onPress={() => handleNavigation('order-history')}>
          <Text style={styles.itemText}>Order History</Text>
          <Image source={ChevronIcon} style={styles.chevron} />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <Pressable style={styles.item} onPress={() => handleNavigation('contact-us')}>
          <Text style={styles.itemText}>Contact Us</Text>
          <Image source={ChevronIcon} style={styles.chevron} />
        </Pressable>

        <Pressable style={styles.item} onPress={() => handleNavigation('help-center')}>
          <Text style={styles.itemText}>Help Center</Text>
          <Image source={ChevronIcon} style={styles.chevron} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    marginTop: 0,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
  },
  chevron: {
    width: 15,
    height: 18,
    tintColor: '#000',
    resizeMode: 'contain',
  },
  logoutButton: {
    marginLeft: 8,
    padding: 4,
  },
  logoutIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000',
  },
}); 