import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Product } from "../constants/types";
import ProductCard from "./ProductCard";

type ProductListProps = {
  title: string;
  products: Product[];
};

const ProductList = ({ title, products } : ProductListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 8,
  },
});

export default ProductList;
