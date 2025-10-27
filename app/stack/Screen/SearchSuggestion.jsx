import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import FoodCard from "../../components/FoodCardRect";
import Header from "../../components/Header";
import { colors } from "../../Config/colorpallete";

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const recentKeywords = ["Burger", "Sandwich", "Pizza", "Pasta"];

  const foodItems = [
    { id: "1", name: "Cheese Burst Pizza", rating: 4.7 },
    { id: "2", name: "American Spicy Burger", rating: 4.3 },
    { id: "3", name: "Cafenio Coffee Club Special", rating: 4.0 },
  ];

  const popularFastFood = [
    {
      id: "1",
      name: "European Pizza",
      description: "Uttora Coffee House",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1601924638867-3ec3d39c1fd7",
    },
    {
      id: "2",
      name: "Buffalo Pizza",
      description: "Cafenio Coffee Club",
      price: "$10.49",
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be00",
    },
    {
      id: "3",
      name: "Chicken Burger",
      description: "American Grill",
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
      id: "4",
      name: "Hot Coffee",
      description: "Cafenio Coffee Club",
      price: "$4.50",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: "5",
      name: "Creamy Pasta",
      description: "Italiano Kitchen",
      price: "$11.25",
      image: "https://images.unsplash.com/photo-1601315576601-2bb0b4ad1c3c",
    },
  ];

  const filteredResults = popularFastFood.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClear = () => {
    setSearchQuery("");
    setSelectedKeyword(null);
  };

  const handleKeywordPress = (keyword) => {
    setSearchQuery(keyword);
    setSelectedKeyword(keyword);
  };

  const handleFoodPress = () => {
    router.push("/stack/Screen/ProductDetails");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Search" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
  <Ionicons name="search" size={18} color={colors.placeholder} style={{ marginRight: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setSelectedKeyword(null);
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={18} color={colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>

      {/* Conditional Rendering */}
      {searchQuery.length === 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Recent Keywords */}
          <Text style={styles.sectionTitle}>Recent Keywords</Text>
          <View style={styles.keywordsContainer}>
            {recentKeywords.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.keywordChip,
                  selectedKeyword === item && styles.keywordChipSelected,
                ]}
                onPress={() => handleKeywordPress(item)}
              >
                <Text
                  style={[
                    styles.keywordText,
                    selectedKeyword === item && styles.keywordTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Food Items */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Food Items</Text>
          <View style={styles.foodList}>
            {foodItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.foodItem}
                onPress={handleFoodPress}
              >
                <View style={styles.foodImagePlaceholder} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color={colors.brand} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Popular Fast Food */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Popular Fast Food
          </Text>
          <View style={styles.popularContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={popularFastFood}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={handleFoodPress} style={{ marginRight: 15 }}>
                  <FoodCard item={item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
            />
          </View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Search Results</Text>

          {filteredResults.length > 0 ? (
            <View style={styles.popularContainer}>
              {filteredResults.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={handleFoodPress}
                  style={{ marginBottom: 15, marginHorizontal: 16 }}
                >
                  <FoodCard item={item} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <Ionicons name="search-outline" size={40} color={colors.placeholder} />
              <Text style={{ marginTop: 10, color: colors.placeholder }}>
                No results found
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingTop: 50,
  },
  
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 20,
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    marginTop: 8,
  },
  keywordChip: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordChipSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  keywordText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  keywordTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
  foodList: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  foodImagePlaceholder: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
    marginRight: 12,
  },
  foodName: {
    fontSize: 15,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  popularContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
});
