import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { colors } from "../../Config/colorpallete";

export default function ProductDetails() {
  const router = useRouter();
  const [size, setSize] = useState("14");
  const [quantity, setQuantity] = useState(2);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Details" />

      {/* Image */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1601924579440-0d61c17c3e8a",
          }}
          style={styles.imagePlaceholder}
          imageStyle={{ borderRadius: 22 }}
        >
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Restaurant */}
      <View style={styles.restaurantTag}>
        <Ionicons name="storefront-outline" size={14} color={colors.brandAccent} />
        <Text style={styles.restaurantText}> Uttora Coffe House</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Pizza Calzone European</Text>
      <Text style={styles.subtitle}>
        Prosciutto e funghi is a pizza variety that is topped with tomato sauce.
      </Text>

      {/* Ratings */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color={colors.highlight} />
          <Text style={styles.statText}> 4.7</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="bicycle-outline" size={16} color={colors.textPrimary} />
          <Text style={styles.statText}> Free</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color={colors.textPrimary} />
          <Text style={styles.statText}> 20 min</Text>
        </View>
      </View>

      {/* Sizes */}
      <Text style={styles.sectionTitle}>SIZE</Text>
      <View style={styles.sizeRow}>
        {["10", "14", "16"].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.sizeBtn, size === s && styles.sizeBtnActive]}
            onPress={() => setSize(s)}
          >
            <Text style={[styles.sizeText, size === s && styles.sizeTextActive]}> {s}"</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ingredients */}
      <Text style={styles.sectionTitle}>INGREDIENTS</Text>
      <View style={styles.ingredientsRow}>
        {["water", "egg", "onion", "cheese", "mushroom"].map((item, index) => (
          <View key={index} style={styles.ingredientCircle}>
            <MaterialCommunityIcons
              name={
                item === "water"
                  ? "bottle-soda-outline"
                  : item === "egg"
                  ? "egg-outline"
                  : item === "onion"
                  ? "onion"
                  : item === "cheese"
                  ? "cheese"
                  : "mushroom-outline"
              }
              size={22}
              color={colors.gradientStart}
            />
          </View>
        ))}
      </View>

      {/* Price and Counter */}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>${32}</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
            <Ionicons name="remove" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name="add" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addBtn}>
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.addGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.addBtnText}>ADD TO CART</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  imageContainer: {
    alignItems: "center",
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: colors.midGray,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  heartIcon: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 50,
    padding: 6,
  },
  restaurantTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 15,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  restaurantText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 18,
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },
  statText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontWeight: "700",
    marginTop: 24,
    color: colors.textPrimary,
    fontSize: 14,
  },
  sizeRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: colors.white,
    elevation: 1,
  },
  sizeBtnActive: {
    backgroundColor: colors.gradientStart,
    borderColor: colors.gradientStart,
  },
  sizeText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sizeTextActive: {
    color: colors.white,
  },
  ingredientsRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  ingredientCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.softPeach,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  addBtn: {
    marginTop: 22,
    borderRadius: 12,
    overflow: "hidden",
  },
  addGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },
  addBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
