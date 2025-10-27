import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { colors } from "../../Config/colorpallete";

export default function OrderDetailsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Order Details"
        rightComponent={
          <TouchableOpacity>
            <Text style={styles.supportText}>Support</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Order Status */}
        <View style={styles.statusBox}>
          <MaterialIcons name="assignment-turned-in" size={24} color={colors.success} />
          <Text style={styles.statusText}>Order was delivered</Text>
        </View>

        {/* Restaurant Info */}
        <View style={styles.restaurantBox}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" }}
            style={styles.restaurantImage}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.restaurantName}>The South Island</Text>
            <Text style={styles.restaurantAddress}>Ruby Hospital Area, Kolkata</Text>
            <Text style={styles.orderItem}>
              <Text style={styles.bold}>1 x </Text> Paneer Delight Pizza{" "}
              <Text style={styles.price}>₹265</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>

        {/* Bill Summary */}
        <View style={styles.billBox}>
          <View style={styles.billHeader}>
            <MaterialIcons name="description" size={20} color={colors.black} />
            <Text style={styles.billTitle}>Bill Summary</Text>
            <TouchableOpacity>
              <Ionicons name="download" size={20} color={colors.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.billRow}>
            <Text>Item total</Text>
            <Text>₹265.00</Text>
          </View>
          <View style={styles.billRow}>
            <Text>GST (govt. taxes)</Text>
            <Text>₹12.55</Text>
          </View>
          <View style={styles.billRow}>
            <Text>Delivery partner fee</Text>
            <Text>
              <Text style={{ textDecorationLine: "line-through" }}>₹39.00 </Text>FREE
            </Text>
          </View>
          <View style={styles.billRow}>
            <Text>Platform fee</Text>
            <Text>₹10.00</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.bold}>Grand total</Text>
            <Text style={styles.bold}>₹287.55</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={{ color: colors.coupon }}>Coupon applied - HUNGRY50</Text>
            <Text style={{ color: colors.coupon }}>- ₹50.00</Text>
          </View>

          <View style={styles.billRow}>
            <Text>Cash round off</Text>
            <Text>₹0.45</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.bold}>Paid</Text>
            <Text style={styles.bold}>₹238.00</Text>
          </View>

          <View style={styles.savedBox}>
            <Text>🎉 You saved ₹89.00 on this order!</Text>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userBox}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Debabrato Das</Text>
            <Text style={styles.userPhone}>821000XXXX</Text>
          </View>
        </View>

        {/* Payment & Address */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Payment method</Text>
          <Text>Paid via: UPI QR</Text>

          <Text style={styles.infoTitle}>Payment date</Text>
          <Text>October 30, 2024 at 9:25 PM</Text>

          <Text style={styles.infoTitle}>Delivery address</Text>
          <Text>Ankan Boys Hostel, Majhi Para, Chowbaga, Kolkata</Text>
        </View>

        <Text style={{ fontSize: 10, color: colors.textMuted, marginTop: 12 }}>
          fssai{"\n"}Lic. No. 22822044000513
        </Text>

        {/* Bottom Buttons */}
        <View style={styles.bottomBtns}>
          <TouchableOpacity style={[styles.btn, styles.reorderBtn]}>
            <Text style={styles.btnText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.invoiceBtn]}>
            <Text style={[styles.btnText, { color: colors.danger }]}>Invoice</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,},
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  supportText: { color: colors.danger, fontWeight: "bold" },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.veryLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: { marginLeft: 8, fontWeight: "500" },
  restaurantBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundAlt,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  restaurantImage: { width: 50, height: 50, borderRadius: 25 },
  restaurantName: { fontWeight: "bold", fontSize: 16 },
  restaurantAddress: { fontSize: 12, color: "#555" },
  orderItem: { marginTop: 4 },
  price: { fontWeight: "bold" },
  callBtn: {
    backgroundColor: colors.softPeach,
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  billBox: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  billHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  billTitle: { fontWeight: "bold", fontSize: 14 },
  billRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  bold: { fontWeight: "bold" },
  savedBox: {
    backgroundColor: colors.saved,
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  userBox: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  userName: { fontWeight: "bold" },
  userPhone: { color: colors.textSecondary },
  infoBox: { marginBottom: 16 },
  infoTitle: { fontWeight: "bold", marginTop: 8 },
  bottomBtns: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  btn: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", marginHorizontal: 4 },
  reorderBtn: { backgroundColor: colors.danger },
  invoiceBtn: { borderWidth: 1, borderColor: colors.danger },
  btnText: { color: colors.white, fontWeight: "bold" },
});
