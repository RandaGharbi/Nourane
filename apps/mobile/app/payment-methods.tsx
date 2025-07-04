import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

// Images locales
import VisaIcon from "../assets/images/visa.png";
import MastercardIcon from "../assets/images/masterCard.png";
import PayPalIcon from "../assets/images/paypal.png";
import CardIcon from "../assets/images/card.png";

// Types
type PaymentMethod = {
  id: string;
  type: "Visa" | "Mastercard";
  last4: string;
  expiry: string;
};

const savedMethods: PaymentMethod[] = [
  { id: "1", type: "Visa", last4: "4567", expiry: "03/2025" },
  { id: "2", type: "Mastercard", last4: "8901", expiry: "01/2026" },
];

// Icônes dynamiques selon type
const icons = {
  Visa: VisaIcon,
  Mastercard: MastercardIcon,
  PayPal: PayPalIcon,
  Card: CardIcon,
};

export default function PaymentMethodsScreen() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    console.log("Selected payment method ID:", id);
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderSavedMethod = ({ item }: { item: PaymentMethod }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelect(item.id)}>
      <Image source={icons[item.type]} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.label}>
          {item.type} •••• {item.last4}
        </Text>
        <Text style={styles.subText}>Expires {item.expiry}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );

  const renderAddMethod = (label: "Credit or Debit Card" | "PayPal") => {
    const iconSource = label === "PayPal" ? icons.PayPal : icons.Card;
    return (
      <TouchableOpacity style={styles.item}>
        <Image source={iconSource} style={styles.icon} />
        <Text style={[styles.label, { marginLeft: 10 }]}>{label}</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      {/* Section List */}
      <SectionList
        sections={[
          { title: "Saved Payment Methods", data: savedMethods },
          {
            title: "Add Payment Method",
            data: [
              { id: "card", label: "Credit or Debit Card" },
              { id: "paypal", label: "PayPal" },
            ],
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, section }) =>
          section.title === "Saved Payment Methods" ? (
            renderSavedMethod({ item })
          ) : (
            renderAddMethod(item.label)
          )
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50,
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 26,
    resizeMode: "contain",
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
});
