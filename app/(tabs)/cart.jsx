import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../Config/colorpallete';

const TAB_BAR_HEIGHT = 60;

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Pizza Calzone European', price: 64, quantity: 2, size: "14'" },
    { id: '2', name: 'Pizza Calzone European', price: 32, quantity: 1, size: "14'" },
  ]);

  const [address, setAddress] = useState('2118 Thornridge Cir. Syracuse');

  const increment = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrement = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // remove item if quantity is 0
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      
      {/* Cart Items */}
      <FlatList
        contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + 220 }}
        data={cartItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSize}>{item.size}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <View style={styles.itemControls}>
              <View style={styles.quantityBox}>
                <TouchableOpacity onPress={() => decrement(item.id)}>
                  <Text style={styles.quantityBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increment(item.id)}>
                  <Text style={styles.quantityBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Checkout Section */}
      <View style={[styles.checkout, { paddingBottom: TAB_BAR_HEIGHT }]}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>{address}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <View style={styles.breakdownBtn}>
            <Text style={styles.totalAmount}>${total}</Text>
            <Text style={styles.breakdownText}>Breakdown {'>'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn}>
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkBg, padding: 16, paddingTop: 78},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    height: 40,
  },

  headerText: {
    color: colors.white,
    fontSize: 18,
    zIndex: 1,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkBg,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },

  itemImage: { width: 64, height: 64, backgroundColor: colors.midGray, borderRadius: 12, marginRight: 12 },

  itemInfo: { flex: 1 },

  itemName: { color: colors.white, fontWeight: '600', fontSize: 16 },
  itemSize: { color: colors.placeholder },
  itemPrice: { color: colors.white, fontWeight: '700', marginTop: 4 },

  itemControls: { alignItems: 'center' },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkBg,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  quantityBtn: { color: colors.white, fontSize: 16, paddingHorizontal: 4 },
  quantityText: { color: colors.white, paddingHorizontal: 8 },

  checkout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    elevation: 10,
  },

  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressLabel: { color: colors.placeholder, fontWeight: '600' },
  editText: { color: colors.brand, fontWeight: '600' },
  addressBox: { backgroundColor: colors.surfaceAlt, padding: 12, borderRadius: 12, marginBottom: 16 },
  addressText: { color: colors.textSecondary },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalLabel: { color: colors.black, fontWeight: '700', fontSize: 18 },
  breakdownBtn: { flexDirection: 'row', alignItems: 'center' },
  totalAmount: { color: colors.black, fontWeight: '700', fontSize: 18, marginRight: 8 },
  breakdownText: { color: colors.brand, fontWeight: '600' },

  placeOrderBtn: { backgroundColor: colors.brand, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  placeOrderText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
