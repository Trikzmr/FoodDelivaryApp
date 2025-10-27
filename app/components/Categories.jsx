import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "../Style/HomeStyles"; // import styles from separate file

export default function Categories({data}) {
const categories = data || [];

  return (
    <>
      <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Categories</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>
      
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              {categories.map((cat) => (
                <View key={cat.id} style={styles.categoryCard}>
                  <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                  <Text style={styles.categoryName}>{cat.name}</Text>
                </View>
              ))}
            </ScrollView>
    </>
      
  );
}
