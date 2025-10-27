import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Config/colorpallete";

export default function Header({ title = "", rightComponent = null, showBack = true }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backPlaceholder} />
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      {rightComponent ? <View style={styles.right}>{rightComponent}</View> : <View style={styles.rightPlaceholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 0,
    backgroundColor: colors.faint,
    borderRadius: 50,
    padding: 8,
    marginLeft: 10,
  },
  backPlaceholder: {
    position: "absolute",
    left: 0,
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  right: {
    position: "absolute",
    right: 0,
    marginRight: 10,
  },
  rightPlaceholder: {
    position: "absolute",
    right: 0,
    width: 40,
    height: 40,
  },
});
