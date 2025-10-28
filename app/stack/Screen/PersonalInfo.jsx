import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { colors } from "../../Config/colorpallete";

export default function PersonalInfo() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Header
        title="Personal Info"
        rightComponent={
          <TouchableOpacity onPress={() => router.push("/stack/Screen/EditProfile")}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        }
      />

      {/* Profile Info Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Vishal Khadok</Text>
        <Text style={styles.subtitle}>I love fast food</Text>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>FULL NAME</Text>
          <Text style={styles.value}>Vishal Khadok</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>EMAIL</Text>
          <Text style={styles.value}>hello@halallab.co</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <Text style={styles.value}>408-841-0926</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Light neutral background
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary, // Dark text for readability
  },

  editText: {
    color: colors.brand, // Orange brand color for accent
    fontWeight: "bold",
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.accentPeach, // Soft peach for friendly tone
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary, // Main text color
  },

  subtitle: {
    fontSize: 13,
    color: colors.textMuted, // Muted text for secondary info
  },

  infoBox: {
    backgroundColor: colors.surface, // Subtle surface color
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
  },

  infoItem: {
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    color: colors.textSecondary, // Slightly muted label text
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    color: colors.textPrimary, // Consistent text color
  },
});
