import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Config/colorpallete";

export default function Profile() {
  const router = useRouter();

  const sections = [
    {
      title: "",
      items: [
        { label: "Personal Info", route: "stack/Screen/PersonalInfo" },
        { label: "My Orders", route: "stack/Screen/MyOrders" }, // change this to your real route
        { label: "Addresses", route: "stack/Screen/Address" },
      ],
    },
    {
      title: "",
      items: [
        { label: "Cart", route: "/(tabs)/cart" },
        { label: "Wishlist", route: "stack/Screen/Wishlist" }, // placeholder
        { label: "Notifications", route: "/Screen/details" },
        { label: "Payment Method", route: "/Screen/details" },
      ],
    },
    {
      title: "",
      items: [
        { label: "FAQs", route: "/Screen/details" },
        { label: "User Reviews", route: "/Screen/details" },
        { label: "Settings", route: "/Screen/details" },
      ],
    },
    {
      title: "",
      items: [{ label: "Log Out", danger: true, route: "/intro" }],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Vishal Khadok</Text>
        <Text style={styles.subtitle}>I love fast food</Text>
      </View>

      {/* Sections */}
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          {section.items.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.item, item.danger && styles.dangerItem]}
              activeOpacity={0.7}
              onPress={() => router.push(item.route)} // 👈 Navigation
            >
              <Text
                style={[
                  styles.itemText,
                  item.danger && styles.dangerText,
                ]}
              >
                {item.label}
              </Text>
              <Text style={[styles.arrow, item.danger && styles.dangerText]}>
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.divider}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentPeach,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 15,
    elevation: 1,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  arrow: {
    fontSize: 18,
    color: colors.textMuted,
  },
  dangerItem: {
    backgroundColor: colors.saved,
  },
  dangerText: {
    color: colors.danger,
  },
  divider: {
    height: 70,
  },
});
