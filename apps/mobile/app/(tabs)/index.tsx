import React, { useCallback } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { products } from "../../constants/data";
import { IngredientsScreen } from "../../components/screens/IngredientScreen";
export default function App() {
  const onLayoutRootView = useCallback(() => {
    // Plus besoin de gérer le splash ici
  }, []);

  return (
    <ScrollView style={styles.container} onLayout={onLayoutRootView}>
      <Header />
      <View style={styles.content}>
        {/* <Banner /> */}
        <ProductList title="Produits en vedette" products={products} />
        
        <IngredientsScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});
