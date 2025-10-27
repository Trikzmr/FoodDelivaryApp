import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../Config/colorpallete";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 45) / 2; // 2 cards with padding

export default function FoodCard({ item }) {
  const [liked, setLiked] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.desc} numberOfLines={1}>
          {item.description}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? colors.brand : colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    marginBottom: 15,
    width: CARD_WIDTH,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 110,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  desc: {
    fontSize: 12,
    color: colors.textMuted,
    marginVertical: 3,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
  },
  price: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.brand,
  },
});
