import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import FoodCard from "../../components/FoodCardMain";
import Header from "../../components/Header";
import { colors } from "../../Config/colorpallete";

export default function Wishlist() {
  const router = useRouter();

  const foodItems = [
    {
      id: "1",
      name: "Cheese Burger",
      description: "Juicy beef patty with cheese",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    },
    {
      id: "2",
      name: "Margherita Pizza",
      description: "Fresh mozzarella & basil",
      price: "$10.49",
      image: "https://images.unsplash.com/photo-1601924579564-6fef9b56c3b1?w=800",
    },
    {
      id: "3",
      name: "Pasta Alfredo",
      description: "Creamy parmesan sauce",
      price: "$9.29",
      image: "https://images.unsplash.com/photo-1627308595187-3e1f9d8d6f03?w=800",
    },
    {
      id: "4",
      name: "Tacos",
      description: "Spicy chicken & veggies",
      price: "$7.59",
      image: "https://images.unsplash.com/photo-1601050690597-2e9b4b18df21?w=800",
    },
    {
      id: "5",
      name: "Sushi Platter",
      description: "Fresh rolls & sashimi",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1589308078054-832cb98164e7?w=800",
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Wishlist" />
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // replaced #FFFFFF
    paddingTop: 50,
    paddingHorizontal: 15,
  },

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
    backgroundColor: colors.faint, // replaced #F0F0F0
    borderRadius: 50,
    padding: 8,
    marginLeft: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary, // replaced #333
    textAlign: "center",
  },

  row: {
    justifyContent: "space-between",
  },
});
