import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import CartItemRow from "../../components/CartItemRow";
import GoBackIcon from '../../assets/images/back.png';
import { useRouter } from 'expo-router';
import { useCart } from "../../context/CartContext";
import { useAuth } from '../../context/AuthContext';
import { Swipeable } from 'react-native-gesture-handler';

const CartScreen: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirige si non connecté
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/'); // ou '/login'
    }
  }, [isAuthenticated, router]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.10; // 10% de taxes (modifie selon ton besoin)
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  // Bloc Order Summary à placer juste après la liste
  const renderOrderSummary = () => (
    <View style={styles.orderSummaryContainer}>
      <View style={styles.divider} />
      <Text style={styles.summaryTitle}>Order Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={styles.summaryValue}>Free</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Taxes</Text>
        <Text style={styles.summaryValue}>${taxes.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, styles.totalText]}>Total</Text>
        <Text style={[styles.summaryValue, styles.totalText]}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec GoBack et titre centré */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.goBackBtn} onPress={() => router.back()}>
          <Image source={GoBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Liste des produits + Order Summary juste après */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF4D4F',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 80,
                  height: '90%',
                  borderRadius: 10,
                  marginVertical: 5,
                }}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Supprimer</Text>
              </TouchableOpacity>
            )}
          >
            <CartItemRow
              item={item}
              onChangeQuantity={(delta) => updateQuantity(item.id, delta)}
              onDelete={() => removeFromCart(item.id)}
            />
          </Swipeable>
        )}
        style={{ marginTop: 8 }}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={renderOrderSummary}
        showsVerticalScrollIndicator={false}
      />

      {/* Checkout Button en bas */}
      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => router.push('/checkout')}
      >
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 0 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  goBackBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  orderSummaryContainer: {
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    paddingHorizontal: 17,
  },
  summaryTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#8A7861',
  },
  summaryValue: {
    fontSize: 13,
    color: '#222',
  },
  totalText: { fontSize: 13 },
  checkoutBtn: {
    backgroundColor: "#F2910D",
    borderRadius: 25,
    padding: 14,
    marginBottom: 70,
    alignItems: "center",
    marginHorizontal: 16,
  },
  checkoutText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});
export default CartScreen;
