import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";

import ProductItem from "../../components/ProductItem";

import { rawHairCare, rawSkinCare, rawBodyCare } from "../../constants/data";
import { convertRawShopToProduct } from "../../constants/transform"; 
import goBackIcon from "../../assets/images/back.png";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const categories = ["All", "Face", "Body", "Hair"];

const allProductsRaw = [...rawHairCare, ...rawSkinCare, ...rawBodyCare];

const ShopScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const router = useRouter();
  
  const handleBasketPress = () => {
    if (isAuthenticated) {
      router.push('/cart');
    } else {
      router.push('/login');
    }
  };
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Filtrer et convertir en même temps
  const filteredProducts = (
    selectedCategory === "All"
      ? allProductsRaw
      : allProductsRaw.filter((p) => p.category === selectedCategory)
  ).map((item) => ({
    ...convertRawShopToProduct(item),
    uniqueId: `${item.category}_${item.id}`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.back()}
        >
          <Image source={goBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Shop</Text>
        <View style={styles.goBackButton} /> {/* placeholder pour équilibrer */}
      </View>

      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categorySelected,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) =>
          item.uniqueId.toString() + item.title.replace(" ", "_")
        }
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            isFavorite={isFavorite(item.uniqueId)}
            onToggleFavorite={() => toggleFavorite(item)}
            onPressBasket={() => {
              addToCart({
                id: item.uniqueId,
                name: item.title,
                image: item.image_url,
                price: item.price,
                volume: item.subtitle,
              });
              router.push('/cart');
            }}
          />
        )}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 16 },
  categories: { flexDirection: "row", marginBottom: 16, flexWrap: "wrap" },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8,
    marginBottom: 20,
  },
  categorySelected: {
    backgroundColor: "#000",
  },
  categoryText: {
    fontSize: 14,
    color: "#555",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  goBackButton: {
    padding: 8,
    width: 40,
    alignItems: "flex-start",
  },
  goBackIcon: {
    width: 24,
    height: 24,
    tintColor: "black",
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});

export default ShopScreen;
