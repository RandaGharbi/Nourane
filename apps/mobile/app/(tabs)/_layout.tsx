import { Tabs } from "expo-router";
import React from "react";
import { Platform, Image, ImageSourcePropType, View, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useCart } from '../../context/CartContext';

import { HapticTab } from "../../components/collapsible/HapticTab";
import TabBarBackground from "../../components/ui/TabBarBackground";

// Import des icônes actives et inactives pour Home, Favorites et Profile
import HomeIconActive from "../../assets/images/activeHome.png";
import HomeIconInactive from "../../assets/images/inactiveHome.png";

import searchIcon from "../../assets/images/search.png";
import ShopIcon from "../../assets/images/shop.png";

import favoritesIconActive from "../../assets/images/activeFavorites.png";
import favoritesIconInactive from "../../assets/images/inactiveFavorites.png";

import ProfileIconActive from "../../assets/images/activeProfile.png";
import ProfileIconInactive from "../../assets/images/inactiveProfile.png";

import BasketIcon from '../../assets/images/basket.png';

function ImageIcon({
  source,
  color,
}: {
  source: ImageSourcePropType;
  color: string;
}) {
  return (
    <Image
      source={source}
      style={{
        width: 20,
        height: 20,
        tintColor: color,
        marginBottom: 6,
      }}
      resizeMode="contain"
    />
  );
}

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  console.log("isAuthenticated TAB BAR:", isAuthenticated);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#8A7861",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <ImageIcon
              source={focused ? HomeIconActive : HomeIconInactive}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <ImageIcon source={searchIcon} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <ImageIcon source={ShopIcon} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused, color }) => (
            <ImageIcon
              source={focused ? favoritesIconActive : favoritesIconInactive}
              color={color}
            />
          ),
        }}
      />

      {isAuthenticated && (
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            href: isAuthenticated ? undefined : null,
            tabBarIcon: ({ color }) => (
              <View>
                <Image source={BasketIcon} style={{ width: 20, height: 20, tintColor: color }} />
                {cartCount > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: -6,
                    right: -10,
                    backgroundColor: 'red',
                    borderRadius: 8,
                    minWidth: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 4,
                  }}>
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{cartCount}</Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
      )}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          href: isAuthenticated ? undefined : null,
          tabBarIcon: ({ focused, color }) => (
            <ImageIcon
              source={focused ? ProfileIconActive : ProfileIconInactive}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
