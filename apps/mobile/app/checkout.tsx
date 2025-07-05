import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import ChevronRight from '../assets/images/chevronRight.png';
import CardIcon from '../assets/images/card.png';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart } = useCart();

  // Calculs dynamiques
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5;
  const taxes = 0.1 * subtotal;
  const total = subtotal + shipping + taxes;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 32 }} />
      </View>

      <Text style={styles.sectionTitle}>Order Summary</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItemRow}>
            <Image source={{ uri: item.image }} style={styles.orderItemImage} />
            <View>
              <Text
                style={styles.orderItemTitle}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.name.length > 32
                  ? item.name.slice(0, 32) + '...'
                  : item.name}
              </Text>
              <Text style={styles.orderItemSubtitle}>{item.volume}</Text>
              <Text style={styles.orderItemSubtitle}>x{item.quantity}</Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />

      <View style={styles.summaryBlock}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.summaryValue}>${taxes.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.totalLabel]}>Total</Text>
          <Text style={[styles.summaryValue, styles.totalLabel]}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Payment Method</Text>
      <TouchableOpacity style={styles.rowBtn} onPress={() => router.push('/payment')}>
        <View style={styles.iconBg}>
          <Image source={CardIcon} style={styles.icon} />
        </View>
        <Text style={styles.rowBtnText}>Credit Card</Text>
        <Image source={ChevronRight} style={styles.chevronIcon} />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <TouchableOpacity style={styles.rowBtn}>
        <View style={styles.addressBlock}>
          <Text style={styles.addressName}>Liam Carter</Text>
          <Text style={styles.addressText}>123 Main St, Anytown, USA</Text>
        </View>
        <Image source={ChevronRight} style={styles.chevronIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.purchaseBtn}>
        <Text style={styles.purchaseText}>Complete Purchase</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 70,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: { fontSize: 20, fontWeight: "bold" },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 10,
    marginLeft: 16,
  },
  orderItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginLeft: 16,
  },
  orderItemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#F6F6F6",
  },
  orderItemTitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#222",
    textTransform: 'capitalize'
  },
  orderItemSubtitle: { fontSize: 13, color: "#8A7861" },
  summaryBlock: { marginHorizontal: 16, marginTop: 8, marginBottom: 16 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  summaryLabel: { fontSize: 13, color: "#000", fontWeight: "300" },
  summaryValue: { fontSize: 13, color: "#222" },
  totalLabel: { fontWeight: "bold", color: "#000", fontWeight: "300" },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  rowBtnText: {
    fontSize: 13,
    color: "#222",
    flex: 1,
    paddingLeft: 0,
    marginLeft: 10,
    marginRight: 0,
    textAlign: 'left',
  },
  icon: { width: 24, height: 24, resizeMode: "contain" },
  chevron: { fontSize: 18, color: "#8A7861" },
  chevronIcon: {
    width: 18,
    height: 18,
    tintColor: '#8A7861',
    resizeMode: 'contain',
    marginLeft: 8,
  },
  addressBlock: { flex: 1, marginLeft: -13 },
  addressName: { fontWeight: "500", fontSize: 14, color: "#222" },
  addressText: { fontSize: 13, color: "#8A7861" },
  purchaseBtn: {
    backgroundColor: "#F2910D",
    borderRadius: 25,
    padding: 14,
    marginTop: 24,
    alignItems: "center",
    marginHorizontal: 16,
  },
  purchaseText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
    marginRight: 10,
    paddingHorizontal: 4,
  },
});
