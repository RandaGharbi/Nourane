import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { OrderCard } from '@/components/OrderCard';
import { useRouter } from 'expo-router';
import { ordersMock } from '../constants/data';
import goBackIcon from '../assets/images/back.png';
import panierIcon from '../assets/images/basket.png';

const screenWidth = Dimensions.get('window').width;

const OrdersHistoryScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* header avec goBack, titre centré, panier */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
          <Image source={goBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Orders & Returns</Text>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={() => alert('Panier cliqué')}>
          <Image source={panierIcon} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsWrapper}>
        <View style={styles.tabs}>
          <Text style={styles.tabInactive}>Active</Text>
          <Text style={styles.tabActive}>History</Text>
        </View>
        <View style={styles.tabsUnderline} />
      </View>

      <FlatList
        data={ordersMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            image={item.image}
            orderNumber={item.orderNumber}
            date={item.date}
            total={item.total}
            onPress={() => router.push(`/order-details/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrdersHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  goBackButton: {
    padding: 8,
    width: 40, // fixe la largeur pour aligner correctement
  },
  goBackIcon: {
    width: 24,
    height: 24,
    tintColor: 'black',
    resizeMode: 'contain',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 8,
    width: 40, // fixe la largeur pour symétrie
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: 'black',
    resizeMode: 'contain',
  },
  tabsWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
  },
  tabInactive: {
    marginRight: 40, // plus d’espace entre Active et History
    fontSize: 15,
    paddingBottom: 8,
    color: '#999',
  },
  tabActive: {
    fontSize: 15,
    fontWeight: '600',
    paddingBottom: 8,
    color: 'black',
  },
  tabsUnderline: {
    width: screenWidth * 0.8, // 80% de la largeur de l’écran
    borderBottomWidth: 2,
    borderBottomColor: '#E5E8EB',
  },
  listContent: {
    paddingBottom: 40,
  },
});
