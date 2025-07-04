import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Product } from '../constants/types';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => Linking.openURL(product.product_url)}
    activeOpacity={0.8}
  >
    <Image source={{ uri: product.image_url }} style={styles.image} />
    <Text style={styles.title}>{product.title}</Text>
    <Text style={styles.price}>{product.price} €</Text>
    {product.customerRating ? (
      <Text style={styles.rating}>
        ⭐ {product.customerRating} ({product.numberOfReviews} avis)
      </Text>
    ) : (
      <Text style={styles.rating}>Pas encore d'avis</Text>
    )}
    <Text style={styles.care}>{product.typeOfCare}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    minWidth: 160,
    maxWidth: 200,
  },
  image: { width: '100%', height: 120, borderRadius: 12 },
  title: { fontWeight: '600', marginTop: 8 },
  price: { color: '#2a9d8f', fontWeight: 'bold', marginTop: 4 },
  rating: { color: '#888', fontSize: 13, marginTop: 2 },
  care: { color: '#aaa', fontSize: 12, marginTop: 2 },
});

export default ProductCard;
