import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { colors } from "../../Config/colorpallete";
import { useRouter } from "expo-router";  


export default function Address() {
  const router = useRouter();

  const addresses = [
    {
      id: 1,
      type: "HOME",
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      icon: "home-outline",
      color: colors.info,
    },
    {
      id: 2,
      type: "WORK",
      address: "3891 Ranchview Dr. Richardson, California 62639",
      icon: "briefcase-outline",
      color: colors.accentPurple,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="My Address" />

      {/* Address List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {addresses.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.typeText}>{item.type}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.iconBtn}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={20}
                  color={colors.accent}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color={colors.accent}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add New Address */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("stack/Screen/AddAddress")}>
        <Text style={styles.addButtonText}>ADD NEW ADDRESS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  addressText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 3,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: colors.brand,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
