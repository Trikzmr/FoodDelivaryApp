import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../Config/colorpallete";
import styles from "../Style/HomeStyles";

export default function SearchBox() {
  const router = useRouter();

  return (
    <View style={styles.searchBar}>
      {/* Search icon on left */}
      <Feather name="search" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />

      {/* Search Input */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => router.push("/stack/Screen/SearchSuggestion")}
        style={{ flex: 1 }}
      >
        <TextInput
          editable={false} // disables direct typing, since we route to search page
          placeholder="Search dishes, restaurants"
          placeholderTextColor={colors.placeholder}
          style={styles.searchInput}
        />
      </TouchableOpacity>
    </View>
  );
}
