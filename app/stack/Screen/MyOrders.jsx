import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Header from "../../components/Header";
import { colors } from "../../Config/colorpallete";

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("Ongoing");
  const router = useRouter();
  const orders = [
    {
      id: "#162432",
      name: "Pizza Hut",
      category: "Food",
      price: "$35.25",
      items: "03 Items",
    },
    {
      id: "#242432",
      name: "McDonald",
      category: "Drink",
      price: "$40.15",
      items: "02 Items",
    },
    {
      id: "#240112",
      name: "Starbucks",
      category: "Drink",
      price: "$10.20",
      items: "01 Item",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="My Orders"
        rightComponent={
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        }
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Ongoing", "History"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeBar} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Order List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((order, index) => (
          <View key={index} style={styles.orderBlock}>
            <Text style={styles.categoryText}>{order.category}</Text>
            <View style={styles.orderCard}>
              <View style={styles.row}>
                <View style={styles.imagePlaceholder} />
                <View style={styles.info}>
                  <Text style={styles.orderName}>{order.name}</Text>
                  <Text style={styles.orderPrice}>{order.price}</Text>
                  <Text style={styles.itemsText}>{order.items}</Text>
                </View>
                <Text style={styles.orderId}>{order.id}</Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.trackBtn}
                  onPress={() => router.push("/stack/Screen/TrackOrder")}
                >
                  <Text style={styles.trackText}>Track Order</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelBtn} onPress={() => router.push("/stack/Screen/OrderDetails")}>
                  <Text style={styles.cancelText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: 15,
  },
  tabItem: {
    marginRight: 25,
    alignItems: "center",
  },
  tabText: {
    fontSize: 15,
    color: colors.midGray,
    fontWeight: "600",
  },
  activeTabText: {
    color: colors.brandDark,
  },
  activeBar: {
    height: 2,
    width: "100%",
    backgroundColor: colors.brandDark,
    marginTop: 6,
    borderRadius: 10,
  },
  orderBlock: {
    marginBottom: 25,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: colors.subtleGray,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  orderPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 4,
  },
  itemsText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  orderId: {
    fontSize: 12,
    color: colors.textMuted,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  trackBtn: {
    flex: 1,
    backgroundColor: colors.brandDark,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  trackText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.brandDark,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    color: colors.brandDark,
    fontSize: 14,
    fontWeight: "600",
  },
});
