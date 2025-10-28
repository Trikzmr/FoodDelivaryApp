import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Categories from "../components/Categories";
import SearchBox from "../components/SearchBox";
import SlidingMenu from "../components/SideMenu"; // ✅ Import here
import { colors } from "../Config/colorpallete";
import styles from "../Style/HomeStyles";

export default function Home() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const categories = [
    { id: 1, name: "Pizza", image: "https://static.vecteezy.com/system/resources/previews/045/969/786/non_2x/transparent-background-isolated-pizza-free-png.png" },
    { id: 2, name: "Burger", image: "https://tse1.mm.bing.net/th/id/OIP.hkPiJzNKtZBsnyxIZoFm9gHaFk?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 3, name: "Pasta", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm6D-Rdchd96KBAey3NTCl2BeeMLNKNUrn9A&s" },
    { id: 4, name: "Sushi", image: "https://img.freepik.com/free-photo/traditional-fresh-japanese-sushi-rolls_2829-8311.jpg?semt=ais_hybrid&w=740&q=80" },
  ];

  const restaurants = [
    {
      id: 1,
      name: "OverLoaded Burger",
      desc: "Burger · Chicken . Fast Food",
      rating: 4.7,
      delivery: "Free",
      time: "20 min",
      image: "https://www.shutterstock.com/image-vector/delicious-homemade-burger-chili-bbq-600nw-1804330342.jpg",
    },
    {
      id: 2,
      name: "Mix Pizza",
      desc: "Pizza · Cheese . Fast Food",
      rating: 4.5,
      delivery: "Free",
      time: "25 min",
      image: "https://i.ytimg.com/vi/4FOlm-Xbodw/maxresdefault.jpg",
    },
  ];

  const foodItems = [
    { id: 1, name: "Cheese Pizza", price: "$10", image: "https://static.vecteezy.com/system/resources/previews/045/383/391/original/a-cheesy-delicious-pizza-with-tasty-pepperoni-on-a-transparent-background-png.png" },
    { id: 2, name: "Veg Burger", price: "$8", image: "https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/6528f9ac2dd11-Classic%20veg%20burger%20hd%20png.png" },
    { id: 3, name: "Pasta Alfredo", price: "$12", image: "https://via.placeholder.com/120" },
    { id: 4, name: "Sushi Platter", price: "$15", image: "https://via.placeholder.com/120" },
  ];

  const navigatetoproductdetails = () => {

    router.push('/stack/Screen/ProductDetails');
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
              <Feather name="menu" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('stack/Screen/Address')}>
            <View style={styles.delivery}>
              <Text style={styles.deliverTo}>DELIVER TO</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationText}>DEV Home </Text>
                <Ionicons name="chevron-down" size={14} color="gray" />
              </View>
            </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={()=>router.push("(tabs)/cart")} style={styles.cartButton}>
            <Feather name="shopping-bag" size={18} color="white" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>
          Hey <Text style={styles.greetingBold}>Dev</Text>, Good Afternoon!
        </Text>

        {/* Search Bar */}
        <SearchBox />

        {/* Categories */}
        <Categories data={categories} />

        {/* Banner */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll}>
          <Image
            source={{ uri: "https://static.vecteezy.com/system/resources/previews/017/670/057/original/fast-food-offer-from-cafe-or-bistro-shop-vector.jpg" }}
            style={styles.bannerImage}
          />
          <Image
            source={{ uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-offer-flyer-template-design-55988057032043c947ac1a6875e7456a_screen.jpg?ts=1696689043" }}
            style={styles.bannerImage}
          />
        </ScrollView>

        {/* Restaurants */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Hot Pick</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        {restaurants.map((res) => (
          <TouchableOpacity key={res.id} onPress={navigatetoproductdetails} style={styles.restaurantCard}>
            <Image source={{ uri: res.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{res.name}</Text>
              <Text style={styles.restaurantDesc}>{res.desc}</Text>
              <View style={styles.restaurantMeta}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="star-rate" size={16} color={colors.brand} />
                  <Text style={styles.metaText}>{res.rating}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="truck" size={14} color={colors.textMuted} />
                  <Text style={styles.metaText}>{res.delivery}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="clock" size={14} color={colors.textMuted} />
                  <Text style={styles.metaText}>{res.time}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Popular Dishes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Dishes</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          {foodItems.map((item) => (
            <TouchableOpacity key={item.id} onPress={navigatetoproductdetails} >
              <View key={item.id} style={styles.foodCard}>
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>{item.price}</Text>
            </View>
            </TouchableOpacity>
           
          ))}
        </ScrollView>

        {/* Must Try */}
        <View style={styles.interactiveSection}>
          <Text style={styles.sectionTitle}>Must Try Items</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingVertical: 12 }}
          >
            {foodItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.mustTryCard,
                  index % 2 === 0
                    ? { backgroundColor: colors.notificationBg }
                    : { backgroundColor: colors.surfaceAlt },
                ]}
                onPress={navigatetoproductdetails}
              >
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {index % 2 === 0 ? "🔥 Hot" : "⭐ Chef's Pick"}
                  </Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Sliding Menu */}
      <SlidingMenu visible={menuVisible} onClose={toggleMenu} />
    </View>
  );
}
