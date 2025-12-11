import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../Config/colorpallete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter} from 'expo-router';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = width < 380 ? 50 : 60;
const CART_SIZE = width < 380 ? 60 : 70;
const ICON_SIZE = width < 380 ? 20 : 24;

export default function TabLayout() {
  const [cartVisible, setCartVisible] = useState(false);
  

  const cartItems = [
    { id: 1, name: 'Cheese Pizza', price: '$10', image: 'https://via.placeholder.com/120' },
    { id: 2, name: 'Veg Burger', price: '$8', image: 'https://via.placeholder.com/120' },
  ];



  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            height: TAB_BAR_HEIGHT,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: colors.white,
            shadowColor: colors.black,
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 4,
            elevation: 5,
            paddingBottom: Platform.OS === 'ios' ? 15 : 8,
          },
          tabBarLabelStyle: { fontSize: 10, marginBottom: 3 },
          tabBarActiveTintColor: colors.brand,
          tabBarInactiveTintColor: colors.placeholder,
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Feather name="home" size={focused ? ICON_SIZE + 2 : ICON_SIZE} color={color} />
            ),
          }}
        />

        {/* Center Cart Tab */}
        <Tabs.Screen
  name="cart"
  options={{
    title: '',
    tabBarIcon: ({ color, focused }) => (
      <View
        style={{
          position: 'absolute',
          top: -CART_SIZE / 2, // half above navbar
          width: CART_SIZE,
          height: CART_SIZE,
          borderRadius: CART_SIZE / 2,
          backgroundColor: colors.black,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: colors.black,
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 6 },
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Feather name="shopping-bag" size={ICON_SIZE + 6} color={colors.white} />
        {/* Count inside the button */}
        <View
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: colors.brand,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.white, fontSize: 12, fontWeight: '700' }}>
            {cartItems.length}
          </Text>
        </View>
      </View>
    ),
    tabBarButton: undefined, // use default behavior
  }}
/>


        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="person-circle-outline" size={focused ? ICON_SIZE + 2 : ICON_SIZE} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Cart Modal */}
      <Modal visible={cartVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: colors.white,
              maxHeight: '60%',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Your Cart</Text>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 60, height: 60, borderRadius: 12, backgroundColor: colors.lightGray }}
                  />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>{item.name}</Text>
                    <Text style={{ color: colors.brand, fontSize: 12 }}>{item.price}</Text>
                  </View>
                  <TouchableOpacity>
                    <Feather name="trash-2" size={20} color={colors.destructive} />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity
              onPress={() => setCartVisible(false)}
              style={{
                marginTop: 16,
                backgroundColor: colors.brand,
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.white, fontWeight: '700' }}>Go to Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
