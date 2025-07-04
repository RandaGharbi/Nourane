import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import favoritesIconInactive from '../assets/images/inactiveFavorites.png';
import favoritesIconActive from '../assets/images/activeFavorites.png';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle, size = 20 }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.button}>
      <Image
        source={isFavorite ? favoritesIconActive : favoritesIconInactive}
        style={[styles.icon, { width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
  icon: {
    tintColor: 'black',
  },
});

export default FavoriteButton;
